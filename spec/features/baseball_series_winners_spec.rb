require 'spec_helper'

feature "User views the table" do
  scenario "user sees all teams" do
    VCR.use_cassette('erik_berg', record: :new_episodes) do
      visit '/'

      expect(page).to have_content "Boston Red Sox"
      expect(page).to have_content "Chicago White Sox"
    end
  end
end
