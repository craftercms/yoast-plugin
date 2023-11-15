document.addEventListener("DOMContentLoaded", function() {

  const getSEOData = () => {
    const title = document.querySelector('title')?.innerText;
    const description = document.querySelector('meta[name="description"]')?.content;
    const keyword = document.querySelector('meta[name="keyword"]')?.content;
    const contents = document.querySelector('body').innerHTML;
    const url = window.location.href;
    const facebookDescription = document.querySelector('meta[property="og:description"]')?.content ?? description;
    const facebookUrl = window.location.host;
    const facebookImageUrl = document.querySelector('meta[property="og:image"]')?.content;

    return {
      title,
      description,
      keyword,
      contents,
      url,
      facebookDescription,
      facebookUrl,
      facebookImageUrl
    }
  };

  window.craftercms.xb.fromTopic('REQUEST_SEO_DATA').subscribe((payload) => {
    window.craftercms.xb.post({
      type: 'RESPONSE_SEO_DATA',
      payload: getSEOData()
    });
  });
});
