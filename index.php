<!DOCTYPE html>
<?php
    include('Parsedown.php');
    $Parsedown = new Parsedown();

    function randpos(){
    	return ' style="margin:' . rand(20, 150) . 'px 0 0 ' . rand(0, 90) . 'px"';
    }

    // Stockage des contenus

	$etudedeterrain = array(
		'charles-carcopino' => array(
			'title'=> 'Charles Carcopino',
			'file'=> 'contents/charles.md',
			'thumb'=> 'charles.png',
			'type'=> 'video',
			'yt_id' => 'PbZjzjqm6CQ',
			'slug'=> 'charles-carcopino',
			'gallery' => '',
			'og_image' => 'img/og/cc.png',
			'og_description' => 'Entretien avec Charles Carcopino, commissaire du festival accès)s( #18, Paysage fiction.'
		),
		'pauline' => array(
			'title'=> 'Pauline Chasseriaud',
			'file'=> 'contents/pauline.md',
			'thumb'=> 'pauline.png',
			'type'=> 'audio',
			'mp3' => 'audio/pauline-chasseriaud.mp3',
			'slug'=> 'pauline-chasseriaud',
			'gallery' => '',
			'og_image' => 'img/og/pc.png',
			'og_description' => 'Entretien avec Pauline Chasseriaud, directrice de l’association accès)s( cultures électroniques autour du festival accès)s( #18, Paysage fiction.'
		),
		'rapdm' => array(
			'title'=> 'Rencontre avec des petites mains',
			'file'=> 'contents/rapdm.md',
			'thumb'=> 'rapdm.png',
			'type'=> 'video',
			'yt_id' => 'Uu3p_wvyVmE',
			'slug'=> 'rapdm',
			'gallery' => '',
			'og_image' => 'img/og/rapdm.png',
			'og_description' => 'Rencontre avec les “petites mains” de l’exposition Paysage fiction du festival accès)s( #18, étudiants de l’École supérieure d’art des Pyrénées en stage au Bel Ordinaire.'
		),
		'quitterie' => array(
			'title'=> 'Quitterie Charpentier',
			'file'=> 'contents/quitterie.md',
			'thumb'=> 'quitterie.png',
			'type'=> 'audio',
			'mp3' => 'audio/quitterie-charpentier.mp3',
			'slug'=> 'quitterie-charpentier',
			'gallery' => '',
			'og_image' => 'img/og/qc.png',
			'og_description' => 'Entretien avec Quitterie Charpentier, chargée de communication et de médiation de l’association accès)s( cultures électroniques autour du festival accès)s( #18, Paysage fiction.'
		)
	);

	$entretienssouslesoleil = array(
		'mischa-daams' => array(
			'title'=> 'Mischa Daams',
			'file'=> 'contents/mischa.md',
			'thumb'=> 'mischa.png',
			'type'=> 'video',
			'yt_id' => 'oNmUq1fsj7M',
			'slug'=> 'mischa-daams',
			'gallery' => '',
			'og_image' => 'img/og/md.png',
			'og_description' => 'Entretien avec Mischa Daams, artiste néerlandais, invité de l’exposition Paysage fiction du festival accès)s( #18.'
		),
		'david-de-tscharner' => array(
			'title'=> 'David de Tscharner',
			'file'=> 'contents/david.md',
			'thumb'=> 'david.png',
			'type'=> 'video',
			'yt_id' => 'fllkZOyh43Y',
			'slug'=> 'david-de-tscharner',
			'gallery' => '',
			'og_image' => 'img/og/ddt',
			'og_description' => 'Entretien avec David de Tscharner, artiste invité de l’exposition Paysage fiction du festival accès)s( #18.'
		),
		'fabien-leaustic' => array(
			'title'=> 'Fabien Léaustic',
			'file'=> 'contents/fabien.md',
			'thumb'=> 'fabien.png',
			'type'=> 'video',
			'yt_id' => 'vYRr0TgDHTE',
			'slug'=> 'fabien-leaustic',
			'gallery' => '',
			'og_image' => 'img/og/fl.png',
			'og_description' => 'Entretien avec Fabien Léaustic, artiste invité de l’exposition Paysage fiction du festival accès)s( #18.'
		),
		'jacques-perconte' => array(
			'title'=> 'Jacques Perconte',
			'file'=> 'contents/jacques.md',
			'thumb'=> 'jacques.png',
			'type'=> 'video',
			'yt_id' => 'MMx3zE2SGiE',
			'slug'=> 'jacques-perconte',
			'gallery' => '',
			'og_image' => 'img/og/jp.png',
			'og_description' => 'Entretien avec Jacques Perconte, artiste invité de l’exposition Paysage fiction du festival accès)s( #18.'
		),
		'helen-evans' => array(
			'title'=> 'Helen Evans',
			'file'=> 'contents/helen.md',
			'thumb'=> 'helen.png',
			'type'=> 'video',
			'yt_id' => 'tdVfHXl6gtc',		
			'slug'=> 'helen-evans',
			'gallery' => '',
			'og_image' => 'img/og/he.png',
			'og_description' => 'Entretien avec Helen Evans du duo HeHe, artiste invitée de l’exposition Paysage fiction du festival accès)s( #18.'
		)
	);

	$horspiste = array(
		'feu-rouge' => array(
			'title'=> 'Feu rouge',
			'file'=> 'contents/feu-rouge.md',
			'thumb'=> 'feu-rouge.png',
			'type'=> 'texte',
			'slug'=> 'feu-rouge',
			'gallery' => '',
			'og_image' => 'img/og/fr.png',
			'og_description' => '…ou comment tromper l’ennui. Un article de Jeanne Hervé Maley sur le festival accès)s( #18, Paysage fiction.'
		),
		'immersion' => array(
			'title'=> 'Immersion dans le paysage',
			'file'=> 'contents/immersion.md',
			'thumb'=> 'immersion.png',
			'type'=> 'texte',
			'slug'=> 'un-acces-vers-une-immersion',
			'gallery' => '',
			'og_image' => 'img/og/immersion.png',
			'og_description' => 'Un article de Christophe Léon sur le festival accès)s( #18, Paysage fiction.'
		),
		'paysage-sonore' => array(
			'title'=> 'Accès)s( étrange',
			'file'=> 'contents/acces-etrange.md',
			'thumb'=> 'acces_etrange.png',
			'type'=> 'audio',
			'mp3' => 'audio/paysage-sonore.mp3',
			'slug'=> 'paysage-sonore',
			'gallery' => '',
			'og_image' => 'img/og/acces-etrange.png',
			'og_description' => 'Field recording et paysage sonore réalisé par César Hélion Joly autour du festival accès)s( #18, Paysage fiction.'
		),

		'panorama' => array(
			'title'=> 'Panorama',
			'file'=> 'contents/panorama.md',
			'thumb'=> 'panorama.png',
			'type'=> 'photo',
			'slug'=> 'panorama',
			'gallery' => 'contents/panorama-gallery.md',
			'og_image' => 'img/og/panorama.png',
			'og_description' => 'Visite en image de l’exposition Paysage fiction du festival accès)s( #18 par Clara Desperben.'
		),
	);

	$contents = array_merge($etudedeterrain, $entretienssouslesoleil, $horspiste);

	// URL for Open Graph protocol
    $main_folder = str_replace('\\','/',dirname(__FILE__) );
    $document_root = str_replace('\\','/',$_SERVER['DOCUMENT_ROOT'] );
	$main_folder = str_replace( $document_root, '', $main_folder);
	$scheme = isset($_SERVER['REQUEST_SCHEME']) ? $_SERVER['REQUEST_SCHEME'] : 'http'; 
	$current_url = $scheme . '://' . $_SERVER['SERVER_NAME']. '/' . ltrim( $main_folder, '/' ) . '/';
    $qs = $_SERVER['QUERY_STRING'];

    if ($qs != '') {
    	$current_content = $contents[$qs];
    	$og_title = 'Libre accès)s( — ' . $current_content['title'];
    	$og_description = $current_content['og_description'];
    	$og_image = $current_url.$current_content['og_image'];
    	$og_url = $current_url.'?'.$qs;
    	$og_type = "article";  	
    } else {
    	$og_title = 'Libre accès)s(';
    	$og_description = "Un regard singulier porté par les étudiants du pôle Nouveaux médias de l’ÉSAD Pyrénées sur le festival accès)s( #18, Paysage fiction";
    	$og_image = $current_url.'img/og/libreaccess.png';
    	$og_url = $current_url; 
    	$og_type = "website"; 
    }
    
    

 ?>
<html>
<head>
	<?php 
	echo "<!-- Libre accès)s( -->\n";
	echo "	<!-- Un regard singulier porté par les étudiants du pôle Nouveaux médias de l’ÉSAD Pyrénées sur le festival accès)s( #18, Paysage fiction -->\n\n";

	?>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?= $og_title ?></title>
	<meta name="description" content="<?= $og_description ?>" />

	<meta id="og_title" property="og:title" content="<?= $og_title ?>" />
	<meta id="og_type" property="og:type" content="<?= $og_type ?>" />
	<meta id="og_url" property="og:url" content="<?= $og_url ?>" />
	<meta id="og_image" property="og:image" content="<?= $og_image ?>" />

	<link rel="stylesheet" type="text/css" href="css/fonts.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="plyr/plyr.css">
	<link rel="stylesheet" type="text/css" href="css/owl.carousel.min.css">
	<link rel="stylesheet" type="text/css" href="css/owl.theme.default.min.css">
	<script type="text/javascript">
		document.base_url = "<?= $current_url ?>";
	</script>
</head>
<body class="locked" 
	data-0="background:rgb(255,255,255)"
	data-10000="background:rgb(255,255,255)"
	data-11000="background:rgb(249,131,255)"
	data-12000="background:rgb(102,255,222)"
	data-13000="background:rgb(128,29,240)"
	data-14000="background:rgb(64,26,255)"
	data-15000="background:rgb(13,41,255)"
	data-16000="background:rgb(246,0,255)">


		<div id="video">
			<div id="bar"></div>
			<video
				poster="" >
				<source type="video/mp4" src="video/intro.mp4">
				<source type="video/webm" src="video/intro.webm">
			</video>
			<div id="intro-overlay" class="start">
				<button class="" id="introbutton">
					<span></span>
				</button>
			</div>
			<div id="introtext">
				<div class="flex">
					<div class="slide small" data-start="4" data-end="8">
						ÉSA Pyrénées<br>
						+ accès)s(
					</div>
					<div class="slide small" data-start="9" data-end="12">
						présentent
					</div>
					<div class="slide savate title" data-start="1" data-end="23">
						Libre accès)s(
					</div>
					<div class="slide small" data-start="18" data-end="23">
						Un workshop mené 
						par Sarah Brown  <br>et les étudiants 
						du Pôle Nouveaux médias  <br>
						de l’École supérieure d’art des Pyrénées
					</div>
					<div class="slide credits" data-start="23" data-end="32">
						Musique : <i>Nuh Nuh</i>, © Joasihno 
					</div>
				</div>
			</div>
		</div>


		<div id="skrollr-body">


			<div id="audioplayer" class="vide">
				<audio id="audio" src=""></audio>
				<button id="audioplayerbutton" class="paused">
					<strong>Play</strong>
					<span>Pause</span>
				</button>
				<div id="audioplayertextcontainer"><p id="audioplayertext"></p></div>
			</div>

			<header id="site-header">
				<h2 id="titre_libre_acces">Libre accès)s( </h2>
				<p id="intro_libre_acces">
					Découvrez les coulisses du festival accès)s( #18.
					<br><br>
					Si rien ne se passe, continuez à scroller…
				</p>
			</header>

			<a href="#apropos" class="contentlink" id="aproposlink" data-type='texte' data-gallery="true">À propos du projet</a>


			<div id="content" class="hidden">
				<aside id="aside"></aside>
				<?php foreach ($contents as $c): ?>
				 	<article id="<?= $c['slug'] ?>"
				 		data-type="<?= $c['type'] ?>"
				 		data-mp3="<?= $c['mp3'] ?>" 
				 		data-og_image="<?= $c['og_image'] ?>" 
				 		data-og_description="<?= $c['og_description'] ?>" 
				 		<?php if ($c['gallery'] != ''): ?> data-gallery="true" <?php endif ?>
				 		class="content content-<?= $c['type'] ?>">
				 		<div>
				 			<h1><?= $c['title'] ?></h1>

					 		<?php if ($c['type'] == 'video'): ?>
					 			<div class="playercontainer">
					 				<div cass="player" id="player-<?= $c['slug'] ?>"  data-plyr-provider="youtube" data-plyr-embed-id="<?= $c['yt_id'] ?>"></div>
					 			</div>
					 		<?php endif ?>

				 			<div class="body">

				 				<div class="<?= $c['type'] ?>">
				 					<?= $Parsedown->text( file_get_contents($c['file']) ); ?>
				 				</div>
				 				<?php if ($c['gallery'] != ''): ?>
			 					<div class="gallery owl-carousel" id="<?= $c['slug'] ?>-gallery">
			 						<?= file_get_contents($c['gallery']); ?>
			 					</div>
			 					<?php endif ?>
				 			</div>

				 		</div>
				 	</article>
				<?php endforeach ?>

				<article id="apropos" class="content content-texte">
			 		<div>
			 			<h1>À propos</h1>

			 			<div class="body">
			 				<div class="texte">
			 					<div>
			 						<?= $Parsedown->text( file_get_contents('contents/apropos-texte.md') ); ?>	
			 					</div>
			 					<div>
			 						<?= $Parsedown->text( file_get_contents('contents/apropos-liste.md') ); ?>
			 					</div>
			 					
			 				</div>
			 				<div class="gallery owl-carousel" id="apropos-gallery">
			 					<?= file_get_contents('contents/apropos-gallery.md'); ?>
			 				</div>
			 			</div>

			 		</div>
			 	</article>
			</div>


			<div id="nav">
				
				<div class="mountain dragscroll" id="mountain1"

					 data-_offsetstart="transform:translate(0vw,0vh);" data-_offsetend="transform:translate(-195vw,0vh);" >
					<div class="line">
						<header>
							<h2>Étude de terrain </h2>
							<p>À la rencontre des organisateurs, commissaire et stagiaires.</p>
						</header>

						<?php foreach ($etudedeterrain as $c): ?>
							<div class="homelink"  <?= randpos() ?> >
						 	<a class="contentlink" 
						 		href="#<?= $c['slug'] ?>" 
						 		data-type="<?= $c['type'] ?>" 
						 		data-mp3="<?= $c['mp3'] ?>" 
						 		<?php if ($c['gallery'] != ''): ?> data-gallery="true" <?php endif ?>
						 		id="homelink-<?= $c['slug'] ?>"	>
						 		<span class="info">[ <?= $c['type'] ?> ]</span>
						 		<span class="img"><img src="img/home/<?= $c['thumb'] ?>"></span>
						 		<h3><?= $c['title'] ?></h3>
						 		<?php if ($c['type'] == 'audio'): ?>
						 			<div class="audioinfo"><?= $Parsedown->text( file_get_contents($c['file']) ); ?></div>
						 		<?php endif ?>
						 	</a>
						 	</div>
						<?php endforeach ?>

					</div>
				</div>

				<!-- Entretiens sous le soleil  -->

				<div class="mountain dragscroll" id="mountain2"

					 data-_offsetstart="transform:translate(0vw,0vh);" data-_offsetend="transform:translate(-160vw,0vh);" >
					<div class="line">
						<header>
							<h2>Entretiens sous le soleil </h2>
							<p>Entretiens en vidéo avec cinq artistes présents dans l’exposition.</p>
						</header>

						<?php foreach ($entretienssouslesoleil as $c): ?>
							<div  class="homelink"  <?= randpos() ?> >
						 	<a class="contentlink" 
						 		href="#<?= $c['slug'] ?>" 
						 		data-type="<?= $c['type'] ?>" 
						 		<?php if ($c['gallery'] != ''): ?> data-gallery="true" <?php endif ?>
						 		data-mp3="<?= $c['mp3'] ?>">
						 		<span class="info">[ <?= $c['type'] ?> ]</span>
						 		<span class="img"><img src="img/home/<?= $c['thumb'] ?>"></span>
						 		<h3><?= $c['title'] ?></h3>
						 		<?php if ($c['type'] == 'audio'): ?>
						 			<div class="audioinfo"><?= $Parsedown->text( file_get_contents($c['file']) ); ?></div>
						 		<?php endif ?>
						 	</a>
						 	</div>
						<?php endforeach ?>

					</div>
				</div>

				<!-- Hors piste  -->

				<div class="mountain dragscroll" id="mountain3"

					 data-_offsetstart="transform:translate(0vw,0vh);" data-_offsetend="transform:translate(-135vw,0vh);" >
					<div class="line">
						<header>
							<h2>Hors piste </h2>
							<p>Autour du festival, textes et sons pour voir différemment. </p>
						</header>

						<?php foreach ($horspiste as $c): ?>
							<div class="homelink"  <?= randpos() ?> >
						 	<a class="contentlink" 
						 		href="#<?= $c['slug'] ?>" 
						 		data-type="<?= $c['type'] ?>" 
						 		<?php if ($c['gallery'] != ''): ?> data-gallery="true" <?php endif ?>
						 		data-mp3="<?= $c['mp3'] ?>">
						 		<span class="info">[ <?= $c['type'] ?> ]</span>
						 		<span class="img"><img src="img/home/<?= $c['thumb'] ?>"></span>
						 		<h3><?= $c['title'] ?></h3>
						 		<?php if ($c['type'] == 'audio'): ?>
						 			<div class="audioinfo"><?= $Parsedown->text( file_get_contents($c['file']) ); ?></div>
						 		<?php endif ?>
						 	</a>
						 	</div>
						<?php endforeach ?>

					</div>

				</div>

			</div>

		</div>

	<script type="text/javascript" src="js/autoplay.js"></script>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/owl.carousel.min.js"></script>
	<script type="text/javascript" src="js/isinviewport.js"></script>
	<script type="text/javascript" src="js/skrollr.min.js"></script>
	<script type="text/javascript" src="plyr/plyr.min.js"></script>
	<script type="text/javascript" src="js/intro.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript">


	</script>

</body>

</html>
