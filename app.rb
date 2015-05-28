require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/reloader'
require 'xmlstats'
require 'haml'
require 'api_cache'

configure :development, :test do
  require 'pry'
  require 'dotenv'

  Dotenv.load
end

configure do
  set :views, 'app/views'
end

Dir[File.join(File.dirname(__FILE__), 'app', '**', '*.rb')].each do |file|
  require file
  also_reload file
end

get '/' do
  @teams = APICache.get('teams', cache: 86400, fail: []) do
    Xmlstats.mlb_teams
  end
  haml :index
end
