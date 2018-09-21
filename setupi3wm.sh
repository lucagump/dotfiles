sudo apt-get install i3

logout - login

enter
winkey -> enter

ls -al

mod+enter -> open terminal
mod+v -> open temrinal vertically
mod+freccia -> ti muovi tra i terminali (j-k-l-;)
mod+r -> resize e frecce (esc)
mod+shift+e -> logout

mod+shift+r -> refresh i3 
mod+shift+number -> move window to workspace
mod+number -> move to workspace
mod+shift+q -> close window
mod+d -> dmenu (far partire programmi)


vim .i3/config

:set number //per vim

bindsym $mod+shift+x exec i3lock

set $workspace1 "1: Chrome"
set $workspace2 "2: Music"
set $workspace3 "3: Atom"
set $workspace4 "4: Terminal"

//Per tutti quelli che andranno configurati

bindsym $mod+1 $workspace1
bindsym $mod+Shift+1 move container to workspace $workspace1

xprop prendi la class con il puntatore
assign [class="google-chrome"] $workspace1
assign [class="cmus"] $workspace2
assign [class="vis"] $workspace2
assign [class="atom"] $workspace3
assign [class="gnome-terminal-server"] $workspace3

ICON
download last version 
unzip file.zip
cd e cd per entrare e spostare il ttf
mkdir ~/.fonts
mv font..ttf ~/.fonts
/*ora basta modificare nel config 
inserendo icona dove serve in base al cheatsheet*/


System Fonts:
Yosemite San Francisco Font Download
cd Download
unzip file
cd folder
mv *.ttf ~/.fonts

font pango: System San Francisco Display 13

sudo apt-get install lxapparence

mod+d e fai partire lxapparence
crea il file config e butta il font che ti piace
il file sarà visibile nella home come .gtkrc-2.0 
e anche  ./config/gtk-3.0/settings.ini

gtk-font-name="System San Francisco Display 13"
installa infinality per render migliore del font


valuta se serve:

https://faq.i3wm.org/question/3747/enabling-multimedia-keys/?answer=3759#post-id-3759

https://github.com/FortAwesome/Font-Awesome/releases
https://fontawesome.com/cheatsheet?from=io



