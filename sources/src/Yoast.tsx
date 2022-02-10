import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import { Paper, SeoAssessor, ContentAssessor, helpers } from "yoastseo";
import {Paper as PaperType} from "./models/Analysis";
import Jed from "jed";
import AnalysisResults from "./components/AnalysisResults";
import GooglePreviewTool, {GooglePreviewProps} from "./components/GooglePreviewTool";
import List from '@mui/material/List';
import FacebookPreviewTool, {FacebookPreviewProps} from "./components/FacebookPreviewTool";

const i18n = () => {
  return new Jed({
    domain: `js-text-analysis`,
    locale_data: {
      "js-text-analysis": {
        "": {}
        // "%1$sSEO title width%3$s: The SEO title is wider than the viewable limit. %2$sTry to make it shorter%3$s.": [
        //   "%1$sJudul SEO%3$s melebihi batas yang dapat dilihat. %2$sCobalah untuk membuatnya lebih pendek%3$s."
        // ]
      }
    }
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
  const requestSEOData = () => {
    setRequestedSEOData(true);
    //@ts-ignore
    window.CrafterCMSNext?.system.getHostToGuestBus().next({ type: 'REQUEST_SEO_DATA' });
  }

  useEffect(() => {
    //@ts-ignore
    const guestToHostSubscription = window.CrafterCMSNext?.system.getGuestToHostBus()
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
    <>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
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
    </>
  )
}

export default Yoast;
