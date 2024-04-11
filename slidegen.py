import os

images = [image for image in os.listdir('img/album') if image.endswith('.png')]

for image in images:
    code = f'''
    <div class="swiper-slide">
        <img src="img/album/{image}" loading="lazy"/>
        <div class="swiper-lazy-preloader"></div>
    </div>
    '''
    print(code)