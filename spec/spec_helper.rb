require 'pry'
require 'rspec'
require 'capybara/rspec'
require 'vcr'

require_relative '../app.rb'

set :environment, :test
set :database, :test

Capybara.app = Sinatra::Application

VCR.configure do |config|
  config.cassette_library_dir = 'spec/cassettes'
  config.hook_into :webmock
end
