require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/reloader'
require 'xmlstats'
require 'haml'

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
  haml :index
end
