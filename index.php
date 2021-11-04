<section class="section section-home">
    <div class="section-bg">
        <picture>
            <img src="/img/default.svg" data-src="/img/girl-home01.png" class="section-bg__img" alt="<?=Yii::t('app','З любов\'ю')?> <?=Yii::$app->params['site']?>" title="<?=Yii::t('app','З любов\'ю')?> <?=Yii::$app->params['site']?>">
        </picture>
    </div>
    <div class="container">
        <div class="row pl-xl-5">
            <div class="col-xl-10 offset-xl-1 pl-xl-5">
                <div class="home-content">
                    <span class="styling-title"><?=Yii::t('app','З любов\'ю')?></span>
                    <p class="main-title text-primary m-0"><?=Yii::$app->params['site']?></p>
                    <p class="title"><?=Yii::t('app','магазин косметики')?></p>
                    <p class="home-content__text"><?=Yii::t('app','Ми пропонуємо найкраще, що може дати природа')?></p>
                    <? $colors = [['F3ECFF', '212, 189, 255, 0.6'], ['FBFFD6','245, 232, 186, 0.6'], ['E7FFF8','176, 242, 226, 0.6'], ['FBFFD6','245, 232, 186, 0.6'], ['FFEBFB','255, 189, 240, 0.6'], ['F3ECFF','212, 189, 255, 0.6']]; ?>
                    <nav class="category-nav-home">
                        <? foreach($categories as $k=>$category) { ?>
                            <a href="<?=\yii\helpers\Url::to(['/katalog/'.$category->url])?>" class="category-nav-home__item"<? if(isset($colors[$k])) { ?> style="background: #<?=$colors[$k][0]?>; box-shadow: 0px 40px 25px -13px rgba(<?=$colors[$k][1]?>);"<? } ?>>
                                <picture class="category-nav-home__item-pic">
                                    <img src="/img/default.svg" data-src="<?=$category->image?'/uploads/categories/'.$category->image:'/img/default.svg'?>" alt="<?=$category->{'name'.\app\components\MultiLanguageHelpers::prefix()}?>" title="<?=$category->{'name'.\app\components\MultiLanguageHelpers::prefix()}?>">
                                </picture>
                                <span class="category-nav-home__item-text"><?=$category->{'name'.\app\components\MultiLanguageHelpers::prefix()}?></span>
                            </a>
                        <? } ?>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</section>
<? if($slider) { ?>
<section class="section section-banner">
    <div class="container-fluid px-0">
        <div class="slider-banner swiper-container">
            <div class="swiper-wrapper">
                <? foreach($slider as $item) { ?>
                <a href="<?=$item['link'.\app\components\MultiLanguageHelpers::prefix()]?>" class="swiper-slide">
                    <picture class="slider-banner__slide">
                        <img src="/img/default.svg" data-src="/uploads/slider/<?=$item['image']?>" alt="<?=$item['title'.\app\components\MultiLanguageHelpers::prefix()]?>" title="<?=$item['title'.\app\components\MultiLanguageHelpers::prefix()]?>">
                    </picture>

                    <picture class="slider-banner__slide-mob">
                        <img src="/img/default.svg" data-src="/uploads/slider/<?=$item['image_mobile']?>" alt="<?=$item['title'.\app\components\MultiLanguageHelpers::prefix()]?>" title="<?=$item['title'.\app\components\MultiLanguageHelpers::prefix()]?>">
                    </picture>
                </a>
                <? } ?>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</section>
<? } ?>
<section class="section section-main-category">
    <div class="container">
        <? if($stock) { ?>
        <div class="row">
            <div class="col-12">
                <div class="main-category">
                    <div class="main-category__head">
                        <p class="main-category__title title-section"><?=Yii::t('app','Акція дня')?></p>
                        <a href="<?=\yii\helpers\Url::to(['/aktsionnyye-predlozheniya'])?>" class="main-category__link-more btn-link"><?=Yii::t('app','Перейти в акції')?></a>
                    </div>
                    <div class="main-category__body">
                        <div class="main-category__slider swiper-container">
                            <div class="swiper-wrapper">
                                <?=$this->context->renderPartial('/products/_item', ['products'=>$stock])?>
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <? } ?>
        <? if($best_sellers) { ?>
        <div class="row">
            <div class="col-12">
                <div class="main-category">
                    <div class="main-category__head">
                        <p class="main-category__title title-section"><?=Yii::t('app','Бестселери')?></p>
                        <!--<a href="#page" class="main-category__link-more btn-link">ПОСМОТРЕТЬ ВСЕ ТОВАРЫ</a>-->
                    </div>
                    <div class="main-category__body">
                        <div class="main-category__slider swiper-container">
                            <div class="swiper-wrapper">
                                <?=$this->context->renderPartial('/products/_item', ['products'=>$best_sellers])?>
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <? } ?>
        <? if($news) { ?>
            <div class="row">
                <div class="col-12">
                    <div class="main-category">
                        <div class="main-category__head">
                            <p class="main-category__title title-section"><?=Yii::t('app','Новинки')?></p>
                            <!--<a href="#page" class="main-category__link-more btn-link">ПОСМОТРЕТЬ ВСЕ ТОВАРЫ</a>-->
                        </div>
                        <div class="main-category__body">
                            <div class="main-category__slider swiper-container">
                                <div class="swiper-wrapper">
                                    <?=$this->context->renderPartial('/products/_item', ['products'=>$news])?>
                                </div>
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <? } ?>
    </div>
</section>
<section class="section section-main-stock">
    <picture>
        <img src="/img/default.svg" data-src="/img/small-ellipse.svg" class="section-main-stock__decor_sm" alt="<?=Yii::t('app','Знижки')?>">
    </picture>
    <picture>
        <img src="/img/default.svg" data-src="/img/big-ellipse.svg" class="section-main-stock__decor_lg" alt="<?=Yii::t('app','Програма лояльності')?>">
    </picture>
    <picture>
        <img src="/img/default.svg" data-src="/img/girl2.png" class="section-main-stock__decor" alt="<?=Yii::t('app','Програма лояльності')?>">
    </picture>
    <div class="container">
        <div class="row pl-xl-5">
            <div class="col-xl-7 offset-xl-1 pl-xl-5">
                <div class="main-stock-container">
                    <span class="styling-title"><?=Yii::t('app','Знижки')?></span>
                    <p class="title"><?=Yii::t('app','Програма лояльності')?></p>
                    <p class="subtitle-text"><?=Yii::t('app','Накопич суму покупок і отримай постійну знижку в нашому інтернет-магазині і всіх магазинах мережі')?></p>
                    <p><a href="<?=\yii\helpers\Url::to(['/programma-loyalnosti'])?>" class="btn-link"><?=Yii::t('app','Дізнатися про програму')?></a></p>
                </div>
            </div>
        </div>
    </div>
</section>
<? if($posts) { ?>
<section class="section section-main-blog">
    <div class="container">
        <div class="row align-items-md-end pl-xl-5">
            <div class="col-xl-3 col-md-6 offset-xl-1 pl-xl-5 mb-3">
                <span class="styling-title">Актуально</span>
                <p class="title mb-4">Блог</p>
                <a href="<?=\yii\helpers\Url::to(['/blog'])?>" class="btn-link"><?=Yii::t('app','ПЕРЕЙТИ ДО ВСІХ СТАТЕЙ')?></a>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-9 offset-lg-2">
                <div class="main-blog">
                    <? foreach($posts as $post) { ?>
                    <div class="main-blog__box">
                        <picture class="main-blog__box-pic">
                            <img src="/img/default.svg" data-src="<?=$post['preview']?$this->context->image('/uploads/posts/', $post['preview'], 840, 400):'/img/default.svg'?>" alt="<?=$post['title']?>" title="<?=$post['title']?>">
                        </picture>
                        <div class="main-blog__box-content">
                            <p class="main-blog__box-title"><?=$post['title']?></p>
                            <p class="main-blog__box-text"><?=\yii\helpers\StringHelper::truncate(strip_tags($post['text']), 130)?></p>
                        </div>
                        <a href="<?=\yii\helpers\Url::to(['/blog/'.$post['url']])?>" class="main-blog__box-link btn-link"><?=Yii::t('app','Читати')?></a>
                    </div>
                    <? } ?>
                </div>
            </div>
        </div>
    </div>
</section>
<? } ?>
<? if($courses) { ?>
<section class="section section-main-courses">
    <picture class="section-main-courses__decor section-main-courses__decor_lg">
        <img src="/img/default.svg" data-src="/img/big-ellipse.svg" alt="<?=Yii::t('app','Семінари')?>">
    </picture>
    <picture class="section-main-courses__decor">
        <img src="/img/default.svg" data-src="/img/girl3.png" alt="<?=Yii::t('app','Семінари')?>">
    </picture>
    <div class="container">
        <div class="main-courses-header row pl-xl-5">
            <div class="offset-xl-1 col-xl-11 pl-xl-5">
                <span class="styling-title"><?=Yii::t('app','Цiкаво')?></span>
                <p class="title mb-4"><?=Yii::t('app','Семінари')?></p>
                <a href="<?=\yii\helpers\Url::to(['/seminary'])?>" class="btn-link"><?=Yii::t('app','Деталі')?></a>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-xxxl-8">
                <div class="main-courses">
                    <? foreach($courses as $course) { ?>
                    <div class="main-courses__box-wrap">
                        <div class="main-courses__box">
                            <picture class="main-courses__box-pic">
                                <img src="/img/default.svg" data-src="<?=$course['image']?$this->context->image('/uploads/images/', $course['image'], 280, 270):'/img/default.svg'?>" alt="<?=$course['name'.\app\components\MultiLanguageHelpers::prefix()]?>" title="<?=$course['name'.\app\components\MultiLanguageHelpers::prefix()]?>">
                            </picture>
                            <p class="main-courses__box-name"><?=$course['name'.\app\components\MultiLanguageHelpers::prefix()]?></p>
                            <a href="<?=\yii\helpers\Url::to(['/seminary/'.$course['url']])?>" class="main-courses__box-link btn btn-lg btn-primary text-uppercase"><?=Yii::t('app','Деталі')?></a>
                        </div>
                    </div>
                    <? } ?>
                </div>
            </div>
        </div>
    </div>
</section>
<? } ?>

<?=$this->context->renderPartial('/site/_faq')?>

<? if($reviews) { ?>
<section class="section section-reviews">
    <picture class="section-reviews__decor">
        <img src="img/default.svg" data-src="/img/girl4.png" alt="<?=Yii::t('app','Відгуки про магазин')?> Lady Prof">
    </picture>
    <div class="container">
        <div class="row pl-xl-5 mb-5 mb-lg-0">
            <div class="col-xxl-4 offset-xxl-1 col-lg-6 pl-xl-5 position-relative">
                <picture class="section-reviews__decor_sm">
                    <img src="/img/default.svg" data-src="img/quotes.svg" alt="<?=Yii::t('app','Відгуки про магазин')?> Lady Prof">
                </picture>
                <p class="title mb-4"><?=Yii::t('app','Відгуки про магазин')?> Lady Prof</p>
                <a href="#" class="d-inline-block btn-link mb-lg-5">Посмотреть все отзывы</a>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-11 offset-lg-1">
                <div class="reviews">
                    <div class="slider-reviews swiper-container">
                        <div class="swiper-wrapper">
                            <? foreach($reviews as $review) { ?>
                            <div class="swiper-slide">
                                <div class="review-box">
                                    <p class="review-box__title"><?=\yii\helpers\Html::encode($review['user_name'])?></p>
                                    <p class="review-box__text"><?=\yii\helpers\Html::encode($review['text'])?></p>
                                </div>
                            </div>
                            <? } ?>
                        </div>
                    </div>
                    <div class="slider-reviews-nav">
                        <div class="swiper-button-prev">
                            <svg>
                                <use xlink:href="/img/spritemap.svg#sprite-arrow"></use>
                            </svg>
                        </div>
                        <div class="swiper-button-next">
                            <svg>
                                <use xlink:href="/img/spritemap.svg#sprite-arrow"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row pl-xl-5">
            <div class="col-xl-11 offset-xl-1 pl-xl-5">
                <button type="button" class="btn btn-lg btn-primary d-block mt-3 mx-auto mx-md-0 mt-lg-4" data-toggle="modal" data-target="#new_review">Оставить отзыв</button>
            </div>
        </div>
    </div>
</section>
<? } ?>
<section class="section section-seo">
    <div class="main-seo container">
        <div class="main-seo-instagram">
            <picture class="main-seo-instagram__decor main-seo-instagram__decor_first">
                <img src="/img/default.svg" data-src="/img/decor02.png" alt="<?=Yii::t('app','Ласкаво просимо в світ')?> Lady Prof">
            </picture>
            <picture class="main-seo-instagram__decor main-seo-instagram__decor_second">
                <img src="/img/default.svg" data-src="/img/decor02.png" alt="<?=Yii::t('app','Ласкаво просимо в світ')?> Lady Prof">
            </picture>
            <picture class="main-seo-instagram__decor main-seo-instagram__decor_third">
                <img src="/img/default.svg" data-src="/img/decor03.png" alt="<?=Yii::t('app','Ласкаво просимо в світ')?> Lady Prof">
            </picture>
            <div class="row">
                <div class="align-self-center col-xxl-5 offset-xxl-1 col-lg-8 px-xxl-5 mb-3 mb-lg-0">
                    <p class="title"><?=Yii::t('app','Ласкаво просимо в світ')?> Lady Prof</p>
                    <a href="<?=$this->context->settings[7][1]['value']?>" rel="nofollow" class="btn-link" target="_blank">Instagram</a>
                </div>

                <div class="col-xxl-6 col-lg-4">
                    <picture class="main-seo-instagram__pic">
                        <img src="/img/default.svg" data-src="/img/inst-collage.png" alt="instagram Lady Prof">
                    </picture>
                </div>
            </div>
        </div>
        <? if($partners) { ?>
        <div class="main-seo-partners">
            <div class="row justify-content-center">
                <div class="col-10">
                    <div class="seo-partners-wrap">
                        <? foreach($partners as $partner) { ?>
                        <picture class="main-seo-partners__pic">
                            <img src="/img/default.svg" data-src="<?=$partner['image']?'/uploads/partners/'.$partner['image']:'/img/default.svg'?>" alt="<?=$partner['title'.\app\components\MultiLanguageHelpers::prefix()]?>" title="<?=$partner['title'.\app\components\MultiLanguageHelpers::prefix()]?>">
                        </picture>
                        <? } ?>
                    </div>
                </div>
            </div>
        </div>
        <? } ?>
        <? if($seo['text']) { ?>
        <div class="main-seo-block row">
            <div class="col-12">
                <div class="seo-block">
                    <?=$seo['text']?>
                </div>
            </div>
        </div>
        <? } ?>
    </div>
</section>