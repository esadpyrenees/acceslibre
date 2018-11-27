<!DOCTYPE html>
<?php 
    include('Parsedown.php');
    $Parsedown = new Parsedown();

    function randpos(){
    	return ' style="margin:' . rand(20, 150) . 'px 0 0 ' . rand(0, 90) . 'px"';
    }

	$etudedeterrain = array(
		'charles-carcopino' => array(
			'title'=> 'Charles Carcopino',
			'file'=> 'contents/charles.md',
			'thumb'=> 'charles.png',
			'type'=> 'video',
			'slug'=> 'charles-carcopino'
		), 
		'pauline' => array(
			'title'=> 'Pauline Chasseriaud',
			'file'=> 'contents/pauline.md',
			'thumb'=> 'pauline.png',
			'type'=> 'audio',
			'mp3' => 'audio/pauline-chasseriaud.mp3',
			'slug'=> 'pauline-chasseriaud'
		),
		'monstage-d-expo' => array(
			'title'=> 'Mon)s(tage d’expo',
			'file'=> 'contents/stagiaires.md',
			'thumb'=> 'stagiaires.png',
			'type'=> 'video',
			'slug'=> 'monstage-d-expo'
		),
		'quitterie' => array(
			'title'=> 'Quitterie Charpentier',
			'file'=> 'contents/quitterie.md',
			'thumb'=> 'quitterie.png',
			'type'=> 'audio',
			'mp3' => 'audio/quitterie-charpentier.mp3',
			'slug'=> 'quitterie-charpentier'
		)
	);

	$entretienssouslesoleil = array(
		'mischa-daams' => array(
			'title'=> 'Mischa Daams',
			'file'=> 'contents/mischa.md',
			'thumb'=> 'mischa.png',
			'type'=> 'video',
			'slug'=> 'mischa-daams'
		),
		'david-de-tscharner' => array(
			'title'=> 'David de Tscharner',
			'file'=> 'contents/david.md',
			'thumb'=> 'david.png',
			'type'=> 'video',
			'slug'=> 'david-de-tscharner'
		),
		'fabien-leaustic' => array(
			'title'=> 'Fabien Léaustic',
			'file'=> 'contents/fabien.md',
			'thumb'=> 'fabien.png',
			'type'=> 'video',
			'slug'=> 'fabien-leaustic'
		),
		'jacques-perconte' => array(
			'title'=> 'Jacques Perconte',
			'file'=> 'contents/jacques.md',
			'thumb'=> 'jacques.png',
			'type'=> 'video',
			'slug'=> 'jacques-perconte'
		),
		'helen-evans' => array(
			'title'=> 'Helen Evans',
			'file'=> 'contents/helen.md',
			'thumb'=> 'helen.png',
			'type'=> 'video',
			'slug'=> 'helen-evans'
		)
	);

	$horspiste = array(
		'feu-rouge' => array(
			'title'=> 'Feu rouge',
			'file'=> 'contents/feu-rouge.md',
			'thumb'=> 'feu-rouge.png',
			'type'=> 'texte',
			'slug'=> 'feu-rouge'
		),
		'immersion' => array(
			'title'=> 'Immersion dans le paysage',
			'file'=> 'contents/immersion.md',
			'thumb'=> 'immersion.png',
			'type'=> 'texte',
			'slug'=> 'un-acces-vers-une-immersion'
		),
		'paysage-sonore' => array(
			'title'=> 'Paysage sonore',
			'file'=> 'contents/paysage-sonore.md',
			'thumb'=> 'paysage-sonore.png',
			'type'=> 'audio',
			'mp3' => 'audio/paysage-sonore.mp3',
			'slug'=> 'paysage-sonore'
		),
	);

	$contents = array_merge($etudedeterrain, $entretienssouslesoleil, $horspiste);
 ?>


<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<title>libre accès)s( — paysage fiction</title>
	<link rel="stylesheet" type="text/css" href="css/fonts.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="locked">

		
		<div id="video">
			<div id="bar"></div>
			<video autoplay
				oncanplay="this.play()" 
				poster="" >
				<source type="video/mp4" src="video/intro.mp4">
				<source type="video/webm" src="video/intro.webm">
			</video>
			<div id="intro-overlay">
				<button class="replay">
					<span>replay</span>
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
					<div class="slide savate" data-start="13" data-end="23">
						Libre accès)s(
					</div>
					<div class="slide small" data-start="18" data-end="23">
						Un workshop mené au Bel Ordinaire <br>
						par Sarah Brown et les étudiants <br>
						du Pôle Nouveaux médias de l’ÉSA Pyrénées
					</div>
				</div>
			</div>
		</div>

		<div id="home">

			<div id="audioplayer" class="vide">
				<button id="audioplayerbutton" class="paused">
					<strong>Play</strong>
					<span>Pause</span>
				</button>
				<p id="audioplayertext"></p>
				<audio id="audio"></audio>
			</div>

			<header id="site-header">
				<h2>Libre accès)s( </h2>
				<p>
					Découvrez les coulisses et les artistes du festival accès)s( #18 – paysage fiction. 
				</p>
			</header>

			<div id="content" class="hidden">

				 <?php foreach ($contents as $c): ?>
				 	<article id="<?= $c['slug'] ?>" 
				 		class="content content-<?= $c['type'] ?>">
				 		<div>
				 			<h1><?= $c['title'] ?></h1>
				 			<?= $Parsedown->text( file_get_contents($c['file']) ); ?>
				 		</div>
				 	</article>
				 <?php endforeach ?>

			</div>

			<div id="scroll">

				<!-- Étude de terrain  -->

				<div class="mountain dragscroll" id="mountain1" 
					data-100p="transform:translate(0vw,0);" data-200p="transform:translate(-75vw,0);" >
					<div class="line">
						<header>
							<h2>Étude de terrain </h2>
							<p>À la rencontre des organisateurs, commissaire et stagiaires.</p>
						</header>

						<?php foreach ($etudedeterrain as $c): ?>
							<div class="homelink"  <?= randpos() ?> >
						 	<a href="#<?= $c['slug'] ?>" data-type="<?= $c['type'] ?>" data-mp3="<?= $c['mp3'] ?>">
						 		<span class="info">[ <?= $c['type'] ?> ]</span>
						 		<span class="img"><img src="img/althome/<?= $c['thumb'] ?>"><img src="img/althomegreen/<?= $c['thumb'] ?>"></span>
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
					data-100p="transform:translate(0vw,0);" data-200p="transform:translate(-115vw,0);" >
					<div class="line">
						<header>
							<h2>Entretiens sous le soleil </h2>
							<p>Entretiens en vidéo avec cinq artistes présents dans l’exposition.</p>
						</header>

						<?php foreach ($entretienssouslesoleil as $c): ?>
							<div class="homelink"  <?= randpos() ?> >
						 	<a href="#<?= $c['slug'] ?>" data-type="<?= $c['type'] ?>" data-mp3="<?= $c['mp3'] ?>">
						 		<span class="info">[ <?= $c['type'] ?> ]</span>
						 		<span class="img"><img src="img/althome/<?= $c['thumb'] ?>"><img src="img/althomegreen/<?= $c['thumb'] ?>"></span>
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
					data-100p="transform:translate(0vw,0);" data-200p="transform:translate(-155vw,0);" >
					<div class="line">
						<header>
							<h2>Hors piste </h2>
							<p>Autour du festival, textes et sons pour voir différemment. </p>
						</header>
						
						<?php foreach ($horspiste as $c): ?>
							<div class="homelink"  <?= randpos() ?> >
						 	<a href="#<?= $c['slug'] ?>" data-type="<?= $c['type'] ?>" data-mp3="<?= $c['mp3'] ?>">
						 		<span class="info">[ <?= $c['type'] ?> ]</span>
						 		<span class="img"><img src="img/althome/<?= $c['thumb'] ?>"><img src="img/althomegreen/<?= $c['thumb'] ?>"></span>
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


		



	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/skrollr.min.js"></script>
	<script type="text/javascript" src="js/intro.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript">
	skrollr.init({
		constants: {
			//fill the box for a "duration" of 150% of the viewport (pause for 150%)
			//adjust for shorter/longer pause
			box: '150p'
		}
	});
	</script>
	
</body>

</html>
