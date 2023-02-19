import cheerio from 'cheerio';
import axios from 'axios';

async function scrapeWeb(){
    //rules changed last this year so we only want results using latest powerball rule set to avoid skewed data
    let year = 2016;
    let regBalls = {};
    let powerBalls = {};
    const baseReq = 'https://www.powerball.net/archive/';

    //grab all the years from 2016 to current!
    while(year < 2023){
        const currentReq = `https://www.powerball.net/archive/${year}`;
        const response = await axios.get(currentReq);
        const $ = cheerio.load(response.data);
    
        //Find all regular balls
        //remember that class name I circled?
        $(".ball").each((i,elem) =>{
            //this pulls text out of the element
            const text = $(elem).text();
            //now we count occurences them using objects, initialize if that prop (the number hasn't had a count yet)
            regBalls[text] = regBalls[text]? regBalls[text] + 1: 1;
        });
        //Find all powerballs
        $(".powerball").each((i,elem) =>{
            //this pulls text out of the element
            const text = $(elem).text();
            //now we count occurences them using objects, initialize if that prop (the number hasn't had a count yet)
            powerBalls[text] = powerBalls[text]? powerBalls[text] + 1: 1;
        });

        year ++
    }


    //create arrays of key value pairs so we can sort by numbers with the highest occurences
    let regBallArray = [];
    let powerBallArray = [];
    for(let key in regBalls){
        regBallArray.push({key,value:regBalls[key]})
    }
    for(let key in powerBalls){
        powerBallArray.push({key,value:powerBalls[key]})
    }

    //sort arrays (descending order)
    regBallArray.sort((a,b) => b.value - a.value);
    powerBallArray.sort((a,b) => b.value - a.value);

    //lets see where we are!
    console.log(regBallArray.slice(0,10))

    //we just want the balls with the highest number of occurences in this set
    const topRegBalls = regBallArray.slice(0,10);
    const topPowerBalls = powerBallArray.slice(0,10);
    return {topRegBalls,topPowerBalls}
}


//load functions have no NODE JS availability in Vercel apparently need to refactor to make this work for deployment there! Lets make it an end point and run scrape on load client side

export async function GET(){
    try{
        const results = await scrapeWeb();
        return new Response(JSON.stringify(results),{status:200})
    }
    catch(error){
        return new Response(JSON.stringify(error),{status:500})
    }


    
}

