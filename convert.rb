#!/usr/bin/env ruby

require 'rubygems'
require 'fastercsv'
require 'json'

# convert the csv data to json

data = []
FasterCSV.foreach("public/sp500.csv") do |row|
  unless row[0] == 'S&P 500 April 16th, 2007' or row[0] == 'Ticker' # 2 header rows
    h = {}
    h[:ticker] = row[0]
    h[:name] = row[1]
    h[:sector] = row[3]
    data << h
  end
end

puts data.to_json