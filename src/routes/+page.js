
export async function load({fetch}){
    //we are going to hit our own end point which according to Vercel will run as Serverless function and we will have Node JS environment there? Lets try!
    const response = await fetch('/api/scrapeWeb');
    const data = await response.json();
    return{
        ballInfo: data
    }



}

