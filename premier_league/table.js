const rawData = require('./results.json')

// Find the relevant team object from the array, or add a new one if it doesn't exist
const findTeam = (array, teamName) => {
    team = array.find((e) => e.teamName === teamName)
    if (!team) {
        team =
        {
            teamName: teamName,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0,
            points: 0
        }
        array.push(team)
    }
    return team
}

//Add the current match data to the relevant teams running total
const addMatch = (array, matchValues) => {
    const team = findTeam(array, matchValues.teamName)
    const scored = matchValues.goals
    const conceded = matchValues.goalsAgainst
    team.goalsFor += scored
    team.goalsAgainst += conceded

    if (scored > conceded) {
        team.wins += 1
        team.points += 3
    } else if (scored < conceded) {
        team.losses += 1
    } else {
        team.draws += 1
        team.points += 1
    }
    team.goalDifference += scored - conceded
}

const sortLeagueTable = (leagueTable) => {
    const sortedTable = leagueTable.sort((a, b) => {
        if (a.points < b.points) return 1
        if (a.points > b.points) return -1
        if (a.goalDifference < b.goalDifference) return 1
        if (a.goalDifference > b.goalDifference) return -1
        if (a.goals < b.goals) return 1
        if (a.goals > b.goals) return -1
        if (a.goals === b.goals) return 0
    })
    return sortedTable

}

// Reduce the raw data to an array of individual team value objects then sort
const leagueTable = (rawData) => {
    const leagueTable = rawData.rounds.reduce((tableTotals, round) => {
        for (match of round.matches) {
            const team1 = { teamName: match.team1 }
            const team2 = { teamName: match.team2 }

            team1.goals = match.score.ft[0]
            team1.goalsAgainst = match.score.ft[1]
            team2.goals = match.score.ft[1]
            team2.goalsAgainst = match.score.ft[0]

            addMatch(tableTotals, team1)
            addMatch(tableTotals, team2)
        }
        return tableTotals
    }, [])

    return sortLeagueTable(leagueTable)
}

//Sort the league table acoording to criteria


console.table(leagueTable(rawData))