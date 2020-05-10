let news;
(async  () => {
    const news_request = await fetch('/api/news/fetchAll');
    news = await news_request.json(); 
    console.log(news);
});