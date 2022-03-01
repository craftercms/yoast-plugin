<#if contentModel.seoTitle_s??>
  <title>${contentModel.seoTitle_s}</title>
</#if>

<#if contentModel.metaDescription_t??>
  <meta name="description" content="${contentModel.metaDescription_t}" />
</#if>

<#if contentModel.focusKeyphrase_s??>
  <meta name="keyword" content="${contentModel.focusKeyphrase_s}" />
</#if>

<#assign robotsContentArray = []/>

<#if contentModel.showInSearchResults_b?has_content>
  <#assign robotsContentArray = robotsContentArray + [ contentModel.showInSearchResults_b?then('index', 'noindex') ] />
</#if>

<#if contentModel.followLinks_b?has_content>
    <#assign robotsContentArray = robotsContentArray + [ contentModel.followLinks_b?then('follow', 'nofollow') ] />
</#if>

<#if contentModel.indexImages_b?has_content>
  <#assign robotsContentArray = robotsContentArray + [
    contentModel.indexImages_b?then('max-image-preview:large', 'max-image-preview:none'),
    contentModel.indexImages_b?then('', 'noimageindex')
  ] />
</#if>

<#if contentModel.arhive_b?has_content>
  <#assign robotsContentArray = robotsContentArray + [ contentModel.arhive_b?then('', 'noarchive') ] />
</#if>

<#-- TODO: pending, need to figure out the snippet size config - probably in the same content-type -->
<#if contentModel.snippet_b?has_content>
<#--  <#assign robotsContentArray = robotsContentArray + [ contentModel.snippet_b?then('', '') ] />-->
</#if>

<#if robotsContentArray?has_content>
  <meta name="robots" content="<#list robotsContentArray as robotsContentValue>${robotsContentValue}<#sep>, </#sep></#list>" />
</#if>
