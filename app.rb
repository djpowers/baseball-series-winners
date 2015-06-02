require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/reloader'
require 'xmlstats'
require 'haml'
require 'redis'

redis = Redis.new

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
  @teams = redis.smembers('team').map!{ |x| JSON.parse(x) }
  @schedules = redis.smembers('schedule').map!{ |x| JSON.parse(x) }

  haml :index
end
