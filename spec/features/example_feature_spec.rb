require 'spec_helper'

feature "User views the index page" do
  VCR.use_cassette('erik_berg', record: :new_episodes) do
    scenario "user sees the correct title" do
      visit '/'

      expect(page).to have_content "Hello World"
    end
  end
end
