function filterMovies(searchText,movies){
    let newMovieList=[];
    for(let i=0;i<movies.length;++i)
    {
        let upperSearchText=searchText.toUpperCase();
        let movieName=movies[i].title;
        let upperMovieName=movieName.toUpperCase();
        let ans = upperMovieName.includes(upperSearchText);
        if (ans == true) {
            newMovieList.push(movies[i]);
        }
    }
    return newMovieList;
}

function sortByRating(order,movies){
    let newOrder=movies.sort((a,b)=>{
        if (order) {
            if (a.vote_average > b.vote_average) {
                return +1
            } else if (a.vote_average == b.vote_average) {
                return 0
            } else if (a.vote_average < b.vote_average) {
                return -1
            }
        } else {
            if (a.vote_average > b.vote_average) {
                return -1
            } else if (a.vote_average == b.vote_average) {
                return 0
            } else if (a.vote_average < b.vote_average) {
                return +1
            }
        }
    })
    return newOrder;
}

function sortByPopularity(order,movies){
    let newOrder=movies.sort((a,b)=>{
        if (order) {
            if (a.popularity > b.popularity) {
                return +1
            } else if (a.popularity == b.popularity) {
                return 0
            } else if (a.popularity < b.popularity) {
                return -1
            }
        } else {
            if (a.popularity > b.popularity) {
                return -1
            } else if (a.popularity == b.popularity) {
                return 0
            } else if (a.popularity < b.popularity) {
                return +1
            }
        }
    })
    return newOrder;
}

module.exports={
    filterMovies:filterMovies,
    sortByRating:sortByRating,
    sortByPopularity:sortByPopularity
}