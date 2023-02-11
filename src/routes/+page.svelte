<script>
    import { fade } from "svelte/transition";
    export let data;

    //we have list of top 10 most often chosen regular and powerballs! 
    //lets start generating sets to play!

    let sets = [];
    function generateSet(topRegBalls,topPowerBalls){
        let set = [];
        if(!topRegBalls || !topPowerBalls)return
        while(set.length < 5){
            //generate a random set of 5 regular balls from the list of top 10
            let randomIndex = Math.floor(Math.random() * topRegBalls.length);
            let randomObject = topRegBalls[randomIndex];

            //even though technically allowed in powerball this is super rare to have the same number twice in one drawing, lets just not do it
            //whoops see what I did? these keys are not going to match!
            //was pushing an int, but comparing the object key to the int! that would never work lol
            if(!set.includes(parseInt(randomObject.key))){
                set.push(parseInt(randomObject.key))
            }
        }

        //after we have 5 regular balls we need one red ball
        let randomIndex = Math.floor(Math.random() * topPowerBalls.length);
        let randomObject = topPowerBalls[randomIndex];
        set.push(parseInt(randomObject.key));
        //push the new set into the list of sets and make sure Svelte updates with assignment
        sets.push(set);
        sets = sets;
        //if you want to check
        console.log('sets', sets);
    }

    function handleDelete(index){
        //need to be able to delete them!
        sets.splice(index,1);
        sets = sets
    }




</script>

<h1>Welcome to Consulting Ninja Lofi Devops</h1>
<h2>Powerball Number Generator! Good Luck</h2>

<button on:click={generateSet(data.ballInfo.topRegBalls,data.ballInfo.topPowerBalls)}>Generate Set</button>
<!--going to be nested lists be sure to add key to prevent funny behavior!-->
{#each sets as set, setIndex (setIndex)}
<div class="ball-container">
    {#each set as ball, index (index)}
    <div transition:fade="{{delay: 250,duration:300}}" class={index <5? 'ball' : 'powerball'}>
        <span>{ball}</span>
    </div>
    {/each}
    <button class="btn-delete" transition:fade="{{delay: 250,duration:300}}" on:click={handleDelete(setIndex)}>
        <span class="material-symbols-outlined">
            delete
            </span>
    </button>
</div>

{/each}



<style>
    .btn-delete{
        height: 3.5em;
        width: 3.5em;
        margin-left: .25em;
        background-color: #242424;
        text-align: center;
    }
    .material-symbols-outlined{
        color:#FFF;
        height: auto;
    }
    .ball-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 1em;
        font-size: larger;
        margin-right: 1em;
    }
    .ball{
        background-color: #FFF;
        color: #242424;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        margin-right: 1em;
        margin-bottom: .5em;
        padding: .5em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .powerball{
        background-color: #b31212;
        color: #FFF;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        margin-right: 1em;
        margin-bottom: .5em;
        padding: .5em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
