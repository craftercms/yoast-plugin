<#if contentModel.yoastSEO_o?has_content>
  <#assign item = contentModel.yoastSEO_o.item[0]>
  <@renderComponent component=item />
</#if>
