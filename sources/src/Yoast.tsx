import React, {useEffect, useMemo, useState} from 'react';
import { Paper, SeoAssessor, ContentAssessor, helpers } from 'yoastseo';
import {Paper as PaperType} from './models/Analysis';
import Jed from 'jed';
import AnalysisResults from './components/AnalysisResults';
import GooglePreviewTool, { GooglePreviewProps } from './components/GooglePreviewTool';
import List from '@mui/material/List';
import FacebookPreviewTool, { FacebookPreviewProps } from './components/FacebookPreviewTool';
import { useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import palette from '@craftercms/studio-ui/styles/palette';

const i18n = () => {
  return new Jed({
    domain: `js-text-analysis`,
    locale_data: { "js-text-analysis": { "": {} } }
  });
};
const contentAssessor = new ContentAssessor(i18n());
const seoAssessor = new SeoAssessor(i18n());

const Yoast = () => {
  const [paper, setPaper] = useState<PaperType>();
  const [googlePreviewData, setGooglePreviewData] = useState<GooglePreviewProps>();
  const [facebookPreviewData, setFacebookPreviewData] = useState<FacebookPreviewProps>();
  const [contentAssessorResults, setContentAssessorResults] = useState();
  const [seoAssessorResults, setSeoAssessorResults] = useState();
  const [requestedSEOData, setRequestedSEOData] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = prefersDarkMode ? 'dark' : 'light';
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      background: {
        default: prefersDarkMode ? palette.gray.dark7 : palette.gray.light0
      }
    },
  }), [prefersDarkMode]);

  const requestSEOData = () => {
    setRequestedSEOData(true);
    //@ts-ignore - Unresolved variable craftercms
    window.craftercms?.utils.subjects.getHostToGuestBus?.().next({ type: 'REQUEST_SEO_DATA' });
  }

  useEffect(() => {
    //@ts-ignore - Unresolved variable craftercms
    const guestToHostSubscription = window.craftercms?.utils.subjects.getGuestToHostBus?.()
      .subscribe((action) => {
        switch (action.type) {
          case 'RESPONSE_SEO_DATA':
            const {
              contents,
              description,
              keyword,
              title,
              url,
              facebookDescription,
              facebookUrl,
              facebookImageUrl
            } = action.payload;

            // title?: string – The SEO title.
            // titleWidth?: number – The width of the title in pixels.
            // description?: string – The SEO description.
            // keyword?: string – The main keyword.
            // synonyms?: string – The main keyword's synonyms.
            // url?: string – The slug.
            // permalink?: string – The base url + slug.

            setPaper(new Paper(contents, {
              title,
              titleWidth: helpers.measureTextWidth(title),
              description,
              keyword,
              url
            }));
            setGooglePreviewData({
              description,
              title,
              url,
              onMouseUp: () => {}
            });
            setFacebookPreviewData({
              title,
              description: facebookDescription,
              siteUrl: facebookUrl,
              imageUrl: facebookImageUrl
            });
            setRequestedSEOData(false);
            break;
          case 'GUEST_CHECK_IN':
          case 'UPDATE_FIELD_VALUE_OPERATION':
            requestSEOData();
            break;
        }
      });

    if (!requestedSEOData) {
      requestSEOData();
    }
    return () => {
      guestToHostSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (paper) {
      contentAssessor.assess(paper);
      seoAssessor.assess(paper);

      setSeoAssessorResults(seoAssessor.results);
      setContentAssessorResults(contentAssessor.results);
    }
  }, [paper]);

  return (
    <ThemeProvider theme={theme}>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav">
        {
          contentAssessor &&
          <AnalysisResults
            heading={"Content Analysis"}
            results={contentAssessorResults}
            assessor={contentAssessor}
          />
        }
        {
          seoAssessor &&
          <AnalysisResults
            heading={"SEO Analysis"}
            results={seoAssessorResults}
            assessor={seoAssessor}
          />
        }
        <GooglePreviewTool data={googlePreviewData} />
        <FacebookPreviewTool data={facebookPreviewData}/>
      </List>
    </ThemeProvider>
  )
}

export default Yoast;
