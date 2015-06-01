task :update_team_results do
  redis = Redis.new

  teams = Xmlstats.mlb_teams
  teams.each do |team|
    redis.sadd('team', team.to_json)
  end
  teams.each do |team|
    puts "Fetching results for #{team.full_name}"
    redis.sadd('schedule', Xmlstats.mlb_team_results(team.team_id, Date.today.year).to_json)
    sleep 10
  end
end
