require 'rubygems'
require 'json'


screens = Array.new
page = Hash.new
pages = Hash.new

page['fastext'] = []
page['pages'] = Array.new

lines = Array.new


# Read the file in as a string (not really caring about memory here)

f = File.open("test.txt", "r") 
char = f.getc

buffer = Array.new

while (char) do 
  
  if(buffer.length < 40)
    if(char != 10)
      buffer.push(char.chr)
    else
     buffer.concat Array.new(40-buffer.length, " ")
     lines.push buffer  
     buffer = Array.new
    end
  else
    lines.push buffer
    buffer = Array.new
    buffer.push(char.chr)
  end
  
  char = f.getc

end 

lines_per_page = 22

current_line = 0
current_page = Array.new

while (current_line < lines.length) do
  
  current_lines = Array.new
  
  current_screen = Array.new
  current_screen =  lines[current_line .. (current_line+lines_per_page)]
  current_screen.each do |l|
    line_str = l.to_s
   
    line_details = Hash.new
    line_details['text'] = line_str
    line_details['colors'] = []
    current_lines.push line_details
    
  end

  
  newPage = Hash.new
  newPage['lines'] = current_lines
  page['pages'].push newPage
 
 
  
  current_line += lines_per_page
end

 puts JSON.pretty_generate(page)