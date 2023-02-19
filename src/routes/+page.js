
export async function load({fetch}){
    //we are going to hit our own end point which according to Vercel will run as Serverless function and we will have Node JS environment there? Lets try!
    try{
        const response = await fetch('/api/scrapeWeb');
        const data = await response.json();
        return{
            ballInfo: data
        }
    }
    catch(error){
        if(!data) data = error;
        return{
            ballInfo: data
        }
    }

}

//off to a good start hope you enjoyed this have a great day! 