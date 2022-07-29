#! /bin/bash

clear
echo ""
echo ""
echo ""
echo "**********************************************"
echo "********** ConsumerTrack Assessment **********"
echo "**********************************************"

sCurrentDirectory=$(pwd)

sudo chmod -R 777 content
if [ $(getent group www-data) ]; then
       sudo chown -R www-data:www-data content
elif [ $(getent group apache) ]; then
       sudo chown -R apache:apache content
fi

###################
### React Theme ###
###################
echo ""
echo "  >> Updating permalink to postname..."

wp-env run cli "wp option update permalink_structure '/%postname%'/" > /dev/null 2>&1
echo "      - Done"

################
### Packages ###
################
echo ""
echo "  >> Installing lorem-ipsum text generator..."

bPackageInstalled=$(sudo npm list -g lorem-ipsum | grep 'lorem-ipsum')
if [ "$bPackageInstalled" = "" ]; then
	sudo npm i -g lorem-ipsum > /dev/null 2>&1
fi
echo "      - Done"

####################
### Sample Posts ###
####################
echo ""
echo "  >> Creating 5 sample posts..."

for i in {1..5}; do
	sRandomText=$(lorem-ipsum 2 paragraphs --format html)
	sExcerpt=$(lorem-ipsum 1 paragraphs --format html)
	wp-env run cli "wp post create --post_type='post' --post_title='Example Post $i' --post_status='publish' --post_content='$sRandomText' --post_excerpt='$sExcerpt' --post_author=1" > /dev/null 2>&1 
done
echo "      - Done"

####################
### Sample Pages ###
####################
echo ""
echo "  >> Creating 5 sample pages..."

for i in {1..5}; do
		sRandomText=$(lorem-ipsum 5 paragraphs --format html)
		sExcerpt=$(lorem-ipsum 1 paragraphs --format html)
		wp-env run cli "wp post create --post_type='page' --post_title='Example Page $i' --post_status='publish' --post_content='$sRandomText' --post_excerpt='$sExcerpt' --post_author=1" > /dev/null 2>&1
done
echo "      - Done"

#########################
### Custom Post Types ###
#########################
echo ""
echo "  >> Creating custom post types..."

sPostTypeFile=content/themes/headless/post-types/movie.php
if [ -f "$sPostTypeFile" ]; then
	echo "      - Movie: done"
else
	wp-env run cli "wp scaffold post-type movie --label='Movie' --theme='headless'" > /dev/null 2>&1
	if [ -f "$sPostTypeFile" ]; then
		echo "      - Movie: done"
	else
		echo "      - Movie: unable to create"
		echo ""
		echo ""
		echo ""
		exit 1
	fi
fi

#######################
### Custom Taxonomy ###
#######################
echo ""
echo "  >> Creating custom taxonomy..."

sTaxonomyFile=content/themes/headless/taxonomies/genre.php
if [ -f "$sTaxonomyFile" ]; then
	echo "      - Genre: done"
else
	wp-env run cli "wp scaffold taxonomy genre --label='Genre' --post_types='movie' --theme='headless'" > /dev/null 2>&1
	if [ -f "$sTaxonomyFile" ]; then
		echo "      - Genre: done"
	else
		echo "      - Genre: unable to create"
		echo ""
		echo ""
		echo ""
		exit 1
	fi
fi

##########################
### Sample Movie Posts ###
##########################
echo ""
echo "  >> Creating 10 sample movie posts..."

declare -A arMovies

arMovies[0,"title"]="Harry Potter and the Sorcerer's Stone"
arMovies[0,"image"]="https://m.media-amazon.com/images/M/MV5BMzkyZGFlOWQtZjFlMi00N2YwLWE2OWQtYTgxY2NkNmM1NjMwXkEyXkFqcGdeQXVyNjY1NTM1MzA@._V1_.jpg"
arMovies[0,"content"]="This is the tale of Harry Potter (Daniel Radcliffe), an ordinary eleven-year-old boy serving as a sort of slave for his aunt and uncle who learns that he is actually a wizard and has been invited to attend the Hogwarts School for Witchcraft and Wizardry. Harry is snatched away from his mundane existence by Rubeus Hagrid (Robbie Coltrane), the groundskeeper for Hogwarts, and quickly thrown into a world completely foreign to both him and the viewer. Famous for an incident that happened at his birth, Harry makes friends easily at his new school. He soon finds, however, that the wizarding world is far more dangerous for him than he would have imagined, and he quickly learns that not all wizards are ones to be trusted."
arMovies[0,"excerpt"]="An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world."
arMovies[0,"genre"]="\"adventure\",\"family\",\"fantasy\""

arMovies[1,"title"]="Harry Potter and the Chamber of Secrets"
arMovies[1,"image"]="https://m.media-amazon.com/images/M/MV5BMjE0YjUzNDUtMjc5OS00MTU3LTgxMmUtODhkOThkMzdjNWI4XkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_.jpg"
arMovies[1,"content"]="Forced to spend his summer holidays with his muggle relations, Harry Potter (Daniel Radcliffe) gets a real shock when he gets a surprise visitor: Dobby (Toby Jones) the house-elf, who warns Harry against returning to Hogwarts, for terrible things are going to happen. Harry decides to ignore Dobby's warning and continues with his pre-arranged schedule. But at Hogwarts, strange and terrible things are indeed happening. Harry is suddenly hearing mysterious voices from inside the walls, muggle-born students are being attacked, and a message scrawled on the wall in blood puts everyone on his or her guard, 'The Chamber Of Secrets Has Been Opened. Enemies Of The Heir, Beware'."
arMovies[1,"excerpt"]="An ancient prophecy seems to be coming true when a mysterious presence begins stalking the corridors of a school of magic and leaving its victims paralyzed."
arMovies[1,"genre"]="\"adventure\",\"family\",\"fantasy\""

arMovies[2,"title"]="Harry Potter and the Prisoner of Azkaban"
arMovies[2,"image"]="https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_.jpg"
arMovies[2,"content"]="Harry Potter (Daniel Radcliffe) is having a tough time with his relatives (yet again). He runs away after using magic to inflate Uncle Vernon's (Richard Griffiths') sister Marge (Pam Ferris), who was being offensive towards Harry's parents. Initially scared for using magic outside the school, he is pleasantly surprised that he won't be penalized after all. However, he soon learns that a dangerous criminal and Voldemort's trusted aide Sirius Black (Gary Oldman) has escaped from Azkaban Prison and wants to kill Harry to avenge the Dark Lord. To worsen the conditions for Harry, vile creatures called Dementors are appointed to guard the school gates and inexplicably happen to have the most horrible effect on him. Little does Harry know that by the end of this year, many holes in his past (whatever he knows of it) will be filled up and he will have a clearer vision of what the future has in store."
arMovies[2,"excerpt"]="Harry Potter, Ron and Hermione return to Hogwarts School of Witchcraft and Wizardry for their third year of study, where they delve into the mystery surrounding an escaped prisoner who poses a dangerous threat to the young wizard."
arMovies[2,"genre"]="\"adventure\",\"family\",\"fantasy\""

arMovies[3,"title"]="Harry Potter and the Goblet of Fire"
arMovies[3,"image"]="https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_.jpg"
arMovies[3,"content"]="Harry's (Daniel Radcliffe's) fourth year at Hogwarts is about to start and he is enjoying the summer vacation with his friends. They get the tickets to The Quidditch World Cup Final, but after the match is over, people dressed like Lord Voldemort's (Ralph Fiennes') 'Death Eaters' set a fire to all of the visitors' tents, coupled with the appearance of Voldemort's symbol, the 'Dark Mark' in the sky, which causes a frenzy across the magical community. That same year, Hogwarts is hosting 'The Triwizard Tournament', a magical tournament between three well-known schools of magic : Hogwarts, Beauxbatons, and Durmstrang. The contestants have to be above the age of seventeen, and are chosen by a magical object called 'The Goblet of Fire'. On the night of selection, however, the Goblet spews out four names instead of the usual three, with Harry unwittingly being selected as the Fourth Champion. Since the magic cannot be reversed, Harry is forced to go with it and brave three exceedingly difficult tasks."
arMovies[3,"excerpt"]="Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares."
arMovies[3,"genre"]="\"adventure\",\"family\",\"fantasy\""

arMovies[4,"title"]="Harry Potter and the Order of the Phoenix"
arMovies[4,"image"]="https://m.media-amazon.com/images/M/MV5BMTM0NTczMTUzOV5BMl5BanBnXkFtZTYwMzIxNTg3._V1_.jpg"
arMovies[4,"content"]="After a lonely summer on Privet Drive, Harry (Daniel Radcliffe) returns to a Hogwarts full of ill-fortune. Few of students and parents believe him or Dumbledore (Sir Michael Gambon) that Voldemort (Ralph Fiennes) is really back. The ministry had decided to step in by appointing a new Defense Against the Dark Arts teacher, Professor Dolores Umbridge (Imelda Staunton), who proves to be the nastiest person Harry has ever encountered. Harry also can't help stealing glances with the beautiful Cho Chang (Katie Leung). To top it off are dreams that Harry can't explain, and a mystery behind something for which Voldemort is searching. With these many things, Harry begins one of his toughest years at Hogwarts School of Witchcraft and Wizardry. "
arMovies[4,"excerpt"]="With their warning about Lord Voldemort's return scoffed at, Harry and Dumbledore are targeted by the Wizard authorities as an authoritarian bureaucrat slowly seizes power at Hogwarts."
arMovies[4,"genre"]="\"adventure\",\"family\",\"fantasy\""

arMovies[5,"title"]="Harry Potter and the Half-Blood Prince"
arMovies[5,"image"]="https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_.jpg"
arMovies[5,"content"]="During Harry Potter's sixth year at Hogwarts, he finds a book that once belonged to the mysterious Half-Blood Prince that earns him the respect of his new Potions professor Horace Slughorn. In addition, Dumbledore must prepare Harry for the ultimate final confrontation by finding out the secret behind Voldemort's power. Meanwhile, a hidden enemy waits in the shadows to carry out a mission given to him by the Dark Lord."
arMovies[5,"excerpt"]="As Harry Potter begins his sixth year at Hogwarts, he discovers an old book marked as 'the property of the Half-Blood Prince' and begins to learn more about Lord Voldemort's dark past."
arMovies[5,"genre"]="\"adventure\",\"family\",\"fantasy\""

arMovies[6,"title"]="Harry Potter and the Deathly Hallows: Part 1"
arMovies[6,"image"]="https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_.jpg"
arMovies[6,"content"]="Voldemort's (Ralph Fiennes') power is growing stronger. He now has control over the Ministry of Magic and Hogwarts. Harry (Daniel Radcliffe), Ron (Rupert Grint), and Hermione (Emma Watson) decide to finish Dumbledore's (Sir Michael Gambon's) work and find the rest of the Horcruxes to defeat the Dark Lord. But little hope remains for the trio and the rest of the Wizarding World, so everything they do must go as planned. "
arMovies[6,"excerpt"]="As Harry, Ron and Hermione race against time and evil to destroy the Horcruxes, they uncover the existence of the three most powerful objects in the wizarding world: the Deathly Hallows."
arMovies[6,"genre"]="\"adventure\",\"family\",\"fantasy\""

arMovies[7,"title"]="Harry Potter and the Deathly Hallows: Part 2"
arMovies[7,"image"]="https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
arMovies[7,"content"]="Harry (Daniel Radcliffe), Ron (Rupert Grint), and Hermione (Emma Watson) continue their quest of finding and destroying Voldemort's (Ralph Fiennes') three remaining Horcruxes, the magical items responsible for his immortality. But as the mystical Deathly Hallows are uncovered, and Voldemort finds out about their mission, the biggest battle begins, and life as they know it will never be the same again. "
arMovies[7,"excerpt"]="Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts."
arMovies[7,"genre"]="\"adventure\",\"family\",\"fantasy\""

arMovies[8,"title"]="The Matrix (1999)"
arMovies[8,"image"]="https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg"
arMovies[8,"content"]="Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. As a rebel against the machines, Neo must confront the agents: super-powerful computer programs devoted to stopping Neo and the entire human rebellion."
arMovies[8,"excerpt"]="When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence."
arMovies[8,"genre"]="\"action\",\"sci-fi\""

arMovies[9,"title"]="TRON (1982)"
arMovies[9,"image"]="https://m.media-amazon.com/images/M/MV5BMzZhNjYyZDYtZmE4MC00M2RlLTlhOGItZDVkYTVlZTYxOWZlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg"
arMovies[9,"content"]="Hacker/arcade owner Kevin Flynn is digitally broken down into a data stream by a villainous software pirate known as Master Control and reconstituted into the internal, 3-D graphical world of computers. It is there, in the ultimate blazingly colorful, geometrically intense landscapes of cyberspace, that Flynn joins forces with Tron to outmaneuver the Master Control Program that holds them captive in the equivalent of a gigantic, infinitely challenging computer game."
arMovies[9,"excerpt"]="A computer hacker is abducted into the digital world and forced to participate in gladiatorial games where his only chance of escape is with the help of a heroic security program."
arMovies[9,"genre"]="\"adventure\",\"action\",\"sci-fi\""

for i in {0..9}; do
	echo ""
	echo "      -------------------------------------------------------------------------------------------------------------"
	echo "      ###### Movie: ${arMovies[$i,"title"]} ######"
	echo ""
	sPostResult=$(wp-env run cli "wp post create --post_type=\"movie\" --post_title=\"${arMovies[$i,"title"]}\" --post_status=\"publish\" --post_content=\"${arMovies[$i,"content"]}\" --post_excerpt=\"${arMovies[$i,"excerpt"]}\" --post_author=1")
	iPostID=$(echo $sPostResult | grep -oP "Created post (\d+)\." | sed "s/[^0-9]*//g")
	if [ $iPostID ]; then
		wp-env run cli "wp media import ${arMovies[$i,"image"]} --post_id=$iPostID --title=\"${arMovies[$i,"title"]}\" --featured_image" > /dev/null 2>&1
		wp-env run cli "wp eval 'wp_set_object_terms($iPostID, array(${arMovies[$i,"genre"]}), \"genre\");'" > /dev/null 2>&1
	fi
done

echo "      - Done"

###############################
### React APP for Wordpress ###
###############################
echo ""
echo "  >> Installing react app..."

sReactAPPDirectory=react-app/node_modules
if [ -d "$sReactAPPDirectory" ]; then
	echo "      - Done"
else
	cd react-app
	npm install --force > /dev/null 2>&1
	cd ..
	if [ -d "$sReactAPPDirectory" ]; then
		echo "      - Done"
	else
		echo "      - Unable to install"
		echo ""
		echo ""
		echo ""
		exit 1
	fi
fi

####################
### Instructions ###
####################
echo ""
#echo ""
#echo "  >> How to configure wordpress"
#echo "      - Install and activate jwt-authentication-for-wp-rest-api (https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) plugin for JWT Authentication for WP REST API"
#echo ""
#echo "      - Install and activate Filester (https://wordpress.org/plugins/filester/) plugin, then add the following lines in .htaccess at the end and inside mod_rewrite.c:"
#echo ""
#echo "            RewriteCond %{HTTP:Authorization} ^(.*) "
#echo "            RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1] "
#echo "            SetEnvIf Authorization \"(.*)\" HTTP_AUTHORIZATION=\$1"
#echo ""
#echo "      - Add the following lines in wp-config.php:"
#echo ""
#echo "            define('JWT_AUTH_SECRET_KEY', 'Qa+NP&.:gn:e00nNo8];+?-^%Al$Oox&G{9v>eA9{_RvB-hi-@K4np +DY|d|d2*');"
#echo "            define('JWT_AUTH_CORS_ENABLE', true);"
echo ""
echo "  >> How to start React APP"
echo "      - Execute the following commands:"
echo "            $ cd react-app"
echo "            $ npm run dev"

# End
echo ""
echo ""
echo ""