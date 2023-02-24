import React, {useEffect, useState} from 'react';
import { Paper, SeoAssessor, ContentAssessor, helpers } from "yoastseo";
import {Paper as PaperType} from "./models/Analysis";
import Jed from "jed";
import AnalysisResults from "./components/AnalysisResults";
import GooglePreviewTool, {GooglePreviewProps} from "./components/GooglePreviewTool";
import List from '@mui/material/List';
import FacebookPreviewTool, {FacebookPreviewProps} from "./components/FacebookPreviewTool";
import FormItem from "./components/FormItem";

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
  const [seoModel, setSeoModel] = useState({});
  const [parentModelId, setParentModelId] = useState<string>('');
  const requestSEOData = () => {
    setRequestedSEOData(true);
    //@ts-ignore
    window.CrafterCMSNext?.system.getHostToGuestBus().next({ type: 'REQUEST_SEO_DATA' });
  }

  useEffect(() => {
    // @ts-ignore
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

    const getSeoInfo = () => {
      // @ts-ignore
      const state = window.craftercms.getStore().getState();
      const modelId = state.preview.guest?.modelId;
      if (modelId) {
        const itemModel = state.preview.guest.models[modelId];
        if (itemModel.yoastSEO_o) { // TODO: should this be retrieved in another way (since variable name may change)?
          setSeoModel(state.preview.guest.models[itemModel.yoastSEO_o[0]]);
          setParentModelId(itemModel.craftercms.id);
        }
      }
    }

    getSeoInfo();
    // @ts-ignore
    window.craftercms?.getStore().subscribe(() => getSeoInfo());

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
        <FormItem
          title="SEO"
          parentModelId={parentModelId}
          seoModel={seoModel}
          setSeoModel={setSeoModel}
          component="seo"
        />
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
        <FormItem
          title="Advanced"
          parentModelId={parentModelId}
          seoModel={seoModel}
          setSeoModel={setSeoModel}
          component="advanced"
        />
      </List>
    </>
  )
}

export default Yoast;
