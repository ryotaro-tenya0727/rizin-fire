# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


  ["朝倉海","井上直樹","扇久保博正","瀧澤謙太"].each do |fighter_name|
    fighter = Fighter.new(
      name: fighter_name,
      fighter_number: rand(999999)
    )
    fighter.save!
  end
