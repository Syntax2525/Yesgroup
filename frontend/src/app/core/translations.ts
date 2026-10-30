import type { Language } from './models';

const en = {
  'nav.home': 'Home',
  'nav.products': 'Products',
  'nav.about': 'About us',
  'nav.contact': 'Contact',

  'brand.name': 'YES GROUP',
  'brand.tagline': 'Growing Tanzania. Feeding the future.',
  'brand.short': 'Agriculture and essential products',

  'pageTitle.home': 'Agriculture and essential products',
  'pageTitle.products': 'Products',
  'pageTitle.product': 'Product details',
  'pageTitle.about': 'About us',
  'pageTitle.contact': 'Contact',
  'pageTitle.notFound': 'Page not found',

  'common.viewProducts': 'View products',
  'common.learnMore': 'Learn more',
  'common.contactUs': 'Contact us',
  'common.backToProducts': 'Back to products',
  'common.loading': 'Loading…',
  'common.retry': 'Try again',
  'common.search': 'Search',
  'common.allCategories': 'All categories',
  'common.allStatuses': 'All availability',
  'common.clearFilters': 'Clear filters',
  'common.products': 'products',
  'common.product': 'product',
  'common.previous': 'Previous',
  'common.next': 'Next',
  'common.page': 'Page',
  'common.of': 'of',
  'common.closeMenu': 'Close menu',
  'common.openMenu': 'Open menu',
  'common.language': 'Language',
  'common.viewDetails': 'View details',
  'common.email': 'Email',
  'common.phone': 'Phone',
  'common.address': 'Address',
  'common.hours': 'Working hours',
  'common.home': 'Home',
  'common.send': 'Send',
  'common.required': 'Required',
  'common.skipToContent': 'Skip to content',
  'common.mainNavigation': 'Main navigation',
  'common.breadcrumb': 'Breadcrumb',

  'home.hero.eyebrow': 'Tanzanian agriculture, powered by YES GROUP',
  'home.hero.title': 'From fertile soil to everyday essentials.',
  'home.hero.subtitle':
    'We produce fertilizers, coffee seedlings, animal feed and sunflower oil — dependable products that help farms, families and businesses grow.',
  'home.hero.primary': 'Explore our products',
  'home.hero.secondary': 'Talk to our team',
  'home.hero.cardLabel': 'Four divisions',
  'home.hero.cardTitle': 'One trusted partner',
  'home.stats.divisions': 'Business divisions',
  'home.stats.divisionsValue': '4',
  'home.stats.local': 'Locally focused',
  'home.stats.localValue': '100%',
  'home.stats.languages': 'Bilingual service',
  'home.stats.languagesValue': 'EN / SW',

  'home.divisions.eyebrow': 'What we do',
  'home.divisions.title': 'Four divisions. One purpose.',
  'home.divisions.subtitle':
    'Our work connects the land to the people who depend on it — with quality products and a commitment to long-term growth.',
  'home.division.fertilizer.title': 'Fertilizer production',
  'home.division.fertilizer.description':
    'Balanced, dependable fertilizers that improve soil health and crop yields for farmers across Tanzania.',
  'home.division.fertilizer.search': 'Fertilizer',
  'home.division.coffee.title': 'Coffee seedlings',
  'home.division.coffee.description':
    'Healthy, high-quality coffee seedlings that give growers a strong start and a more productive future.',
  'home.division.coffee.search': 'Coffee',
  'home.division.feed.title': 'Animal feed',
  'home.division.feed.description':
    'Practical, nutritious feed solutions that support healthier livestock and more reliable farm income.',
  'home.division.feed.search': 'Feed',
  'home.division.oil.title': 'Sunflower oil',
  'home.division.oil.description':
    'Quality sunflower oil for households, retailers and food businesses — produced and supplied with care.',
  'home.division.oil.search': 'Sunflower',

  'home.featured.eyebrow': 'Our catalogue',
  'home.featured.title': 'Products built for growth',
  'home.featured.subtitle':
    'Explore a selection of our products. Search the full catalogue to find exactly what you need.',
  'home.featured.empty':
    'Our catalogue is being updated. Please check back soon or contact our team.',
  'home.featured.error': 'We could not load featured products right now.',

  'home.why.eyebrow': 'Why YES GROUP',
  'home.why.title': 'Practical quality. Lasting relationships.',
  'home.why.subtitle':
    'We combine local knowledge with a commitment to consistent quality at every stage.',
  'home.why.quality.title': 'Quality first',
  'home.why.quality.description':
    'Every product is handled with care and a focus on dependable results.',
  'home.why.local.title': 'Local expertise',
  'home.why.local.description':
    'We understand Tanzanian agriculture and the realities of the customers we serve.',
  'home.why.supply.title': 'Reliable supply',
  'home.why.supply.description':
    'We work to keep essential products available when farmers and families need them.',
  'home.why.service.title': 'Bilingual service',
  'home.why.service.description': 'Our team supports customers in both English and Swahili.',

  'home.cta.eyebrow': 'Let’s grow together',
  'home.cta.title': 'Ready to grow with YES GROUP?',
  'home.cta.subtitle':
    'Tell us what you need and our team will help you find the right solution.',
  'home.cta.button': 'Start a conversation',

  'products.eyebrow': 'Catalogue',
  'products.title': 'Products for farms, families and businesses',
  'products.subtitle':
    'Browse our range of fertilizers, coffee seedlings, animal feed and sunflower oil.',
  'products.searchPlaceholder': 'Search by product name',
  'products.filterCategory': 'Category',
  'products.filterStatus': 'Availability',
  'products.filtersLabel': 'Product filters',
  'products.results': '{count} products found',
  'products.resultsOne': '1 product found',
  'products.empty.title': 'No products found',
  'products.empty.text': 'Try a different search term or clear your filters.',
  'products.error.title': 'We could not load the catalogue',
  'products.error.text': 'Please check your connection and try again.',
  'products.pageInfo': 'Page {page} of {pages}',

  'product.status.ACTIVE': 'Available',
  'product.status.INACTIVE': 'Unavailable',
  'product.status.OUT_OF_STOCK': 'Out of stock',
  'product.status': 'Availability',
  'product.details': 'Product details',
  'product.description': 'Description',
  'product.noDescription': 'Contact us for more information about this product.',
  'product.category': 'Category',
  'product.unit': 'Unit',
  'product.stock': 'Stock',
  'product.stockValue': '{count} available',
  'product.price': 'Price',
  'product.inStock': 'In stock',
  'product.outOfStock': 'Currently out of stock',
  'product.related': 'You may also like',
  'product.notFound.title': 'Product not found',
  'product.notFound.text':
    'The product you are looking for may have been moved or is no longer available.',
  'product.error.title': 'We could not load this product',
  'product.error.text': 'Please try again in a moment.',
  'product.imageAlt': 'Photo of {name}',
  'product.contactCta.title': 'Need help choosing?',
  'product.contactCta.text': 'Our team can answer questions about availability, pricing and supply.',
  'product.contactCta.button': 'Ask about this product',

  'about.eyebrow': 'About YES GROUP',
  'about.title': 'Rooted in Tanzania. Growing with our communities.',
  'about.subtitle':
    'YES GROUP is a Tanzanian company built around practical products and long-term partnerships.',
  'about.story.title': 'Our story',
  'about.story.p1':
    'YES GROUP works across agriculture and everyday essentials. Our four divisions — fertilizer production, coffee seedlings, animal feed and sunflower oil — reflect our belief that strong local production creates lasting value.',
  'about.story.p2':
    'We serve farmers, families, retailers and businesses with products that are useful, dependable and backed by a team that understands the communities we work in.',
  'about.mission.title': 'Our mission',
  'about.mission.text':
    'To provide quality agricultural and essential products that help people and businesses thrive.',
  'about.vision.title': 'Our vision',
  'about.vision.text':
    'To be a trusted Tanzanian partner for sustainable growth, from the soil to the household.',
  'about.values.title': 'What guides us',
  'about.value.quality.title': 'Quality',
  'about.value.quality.text':
    'We take pride in doing things properly and delivering products people can rely on.',
  'about.value.integrity.title': 'Integrity',
  'about.value.integrity.text':
    'We build relationships through honesty, consistency and respect.',
  'about.value.community.title': 'Community',
  'about.value.community.text':
    'We grow by supporting the farmers, families and businesses around us.',
  'about.value.innovation.title': 'Progress',
  'about.value.innovation.text':
    'We look for better ways to serve our customers and use local resources well.',
  'about.cta.title': 'Work with a team that understands the ground beneath your feet.',
  'about.cta.text':
    'Whether you are planning a farm, stocking a shop or looking for a reliable supply partner, we would like to hear from you.',

  'contact.eyebrow': 'Contact',
  'contact.title': 'Let’s talk about what you need.',
  'contact.subtitle':
    'Reach our team for product information, supply enquiries or partnership opportunities.',
  'contact.info.title': 'Contact details',
  'contact.hours.value': 'Monday–Friday, 8:00–17:00',
  'contact.form.title': 'Send an enquiry',
  'contact.form.intro':
    'Complete the form and your email app will open with the message ready to send.',
  'contact.form.name': 'Full name',
  'contact.form.email': 'Email address',
  'contact.form.phone': 'Phone number',
  'contact.form.subject': 'Subject',
  'contact.form.message': 'Message',
  'contact.form.placeholder.name': 'Your name',
  'contact.form.placeholder.email': 'you@example.com',
  'contact.form.placeholder.phone': '+255 ...',
  'contact.form.placeholder.subject': 'How can we help?',
  'contact.form.placeholder.message': 'Tell us a little about your enquiry.',
  'contact.form.send': 'Open email app',
  'contact.form.defaultSubject': 'Website enquiry',
  'contact.form.success':
    'Your email app has been opened. If it did not open, email us directly at {email}.',
  'contact.form.invalidEmail': 'Enter a valid email address',

  'footer.about':
    'YES GROUP produces fertilizers, coffee seedlings, animal feed and sunflower oil for customers across Tanzania.',
  'footer.quickLinks': 'Explore',
  'footer.divisions': 'Our divisions',
  'footer.contact': 'Contact',
  'footer.rights': '© {year} YES GROUP. All rights reserved.',
  'footer.language': 'Available in English and Swahili',

  'notFound.title': 'Page not found',
  'notFound.text': 'The page you are looking for does not exist or has moved.',
  'notFound.button': 'Back to home',

  'errors.api': 'Unable to reach the server. Please try again.',
  'errors.categories': 'Categories are temporarily unavailable.'
} as const;

export type TranslationKey = keyof typeof en;

const sw: Record<TranslationKey, string> = {
  'nav.home': 'Nyumbani',
  'nav.products': 'Bidhaa',
  'nav.about': 'Kuhusu sisi',
  'nav.contact': 'Mawasiliano',

  'brand.name': 'YES GROUP',
  'brand.tagline': 'Tunakuza Tanzania. Tunalisha kesho.',
  'brand.short': 'Kilimo na bidhaa muhimu',

  'pageTitle.home': 'Kilimo na bidhaa muhimu',
  'pageTitle.products': 'Bidhaa',
  'pageTitle.product': 'Maelezo ya bidhaa',
  'pageTitle.about': 'Kuhusu sisi',
  'pageTitle.contact': 'Mawasiliano',
  'pageTitle.notFound': 'Ukurasa haupatikani',

  'common.viewProducts': 'Tazama bidhaa',
  'common.learnMore': 'Jifunze zaidi',
  'common.contactUs': 'Wasiliana nasi',
  'common.backToProducts': 'Rudi kwenye bidhaa',
  'common.loading': 'Inapakia…',
  'common.retry': 'Jaribu tena',
  'common.search': 'Tafuta',
  'common.allCategories': 'Kategoria zote',
  'common.allStatuses': 'Upatikanaji wote',
  'common.clearFilters': 'Ondoa vichujio',
  'common.products': 'bidhaa',
  'common.product': 'bidhaa',
  'common.previous': 'Iliyotangulia',
  'common.next': 'Ifuatayo',
  'common.page': 'Ukurasa',
  'common.of': 'kati ya',
  'common.closeMenu': 'Funga menyu',
  'common.openMenu': 'Fungua menyu',
  'common.language': 'Lugha',
  'common.viewDetails': 'Tazama maelezo',
  'common.email': 'Barua pepe',
  'common.phone': 'Simu',
  'common.address': 'Anwani',
  'common.hours': 'Saa za kazi',
  'common.home': 'Nyumbani',
  'common.send': 'Tuma',
  'common.required': 'Inahitajika',
  'common.skipToContent': 'Nenda kwenye maudhui',
  'common.mainNavigation': 'Urambazaji mkuu',
  'common.breadcrumb': 'Njia ya ukurasa',

  'home.hero.eyebrow': 'Kilimo cha Tanzania, kikiongozwa na YES GROUP',
  'home.hero.title': 'Kutoka udongo wenye rutuba hadi mahitaji ya kila siku.',
  'home.hero.subtitle':
    'Tunazalisha mbolea, miche ya kahawa, chakula cha mifugo na mafuta ya alizeti — bidhaa za kuaminika zinazosaidia mashamba, familia na biashara kukua.',
  'home.hero.primary': 'Gundua bidhaa zetu',
  'home.hero.secondary': 'Zungumza na timu yetu',
  'home.hero.cardLabel': 'Vitengo vinne',
  'home.hero.cardTitle': 'Mshirika mmoja wa kuaminika',
  'home.stats.divisions': 'Vitengo vya biashara',
  'home.stats.divisionsValue': '4',
  'home.stats.local': 'Tunazingatia ndani',
  'home.stats.localValue': '100%',
  'home.stats.languages': 'Huduma kwa lugha mbili',
  'home.stats.languagesValue': 'EN / SW',

  'home.divisions.eyebrow': 'Tunachofanya',
  'home.divisions.title': 'Vitengo vinne. Lengo moja.',
  'home.divisions.subtitle':
    'Kazi yetu inaunganisha ardhi na watu wanaoitumia — kwa bidhaa bora na kujitolea kwa ukuaji wa muda mrefu.',
  'home.division.fertilizer.title': 'Uzalishaji wa mbolea',
  'home.division.fertilizer.description':
    'Mbolea bora na za kuaminika zinazoboresha afya ya udongo na mavuno kwa wakulima kote Tanzania.',
  'home.division.fertilizer.search': 'Mbolea',
  'home.division.coffee.title': 'Miche ya kahawa',
  'home.division.coffee.description':
    'Miche ya kahawa yenye afya na ubora wa juu inayowapa wakulima mwanzo imara na mustakabali wenye tija zaidi.',
  'home.division.coffee.search': 'Kahawa',
  'home.division.feed.title': 'Chakula cha mifugo',
  'home.division.feed.description':
    'Suluhisho la chakula cha mifugo chenye lishe na matumizi bora linalosaidia mifugo kuwa na afya na mapato ya shamba kuwa ya kuaminika zaidi.',
  'home.division.feed.search': 'Mifugo',
  'home.division.oil.title': 'Mafuta ya alizeti',
  'home.division.oil.description':
    'Mafuta ya alizeti yenye ubora kwa kaya, wauzaji rejareja na biashara za chakula — yanayozalishwa na kusambazwa kwa uangalifu.',
  'home.division.oil.search': 'Alizeti',

  'home.featured.eyebrow': 'Katalogi yetu',
  'home.featured.title': 'Bidhaa zilizoundwa kwa ukuaji',
  'home.featured.subtitle':
    'Gundua baadhi ya bidhaa zetu. Tafuta katalogi kamili kupata unachohitaji.',
  'home.featured.empty':
    'Katalogi yetu inasasishwa. Tafadhali angalia tena hivi karibuni au wasiliana na timu yetu.',
  'home.featured.error': 'Hatukuweza kupakia bidhaa zilizoangaziwa kwa sasa.',

  'home.why.eyebrow': 'Kwa nini YES GROUP',
  'home.why.title': 'Ubora wa vitendo. Mahusiano ya kudumu.',
  'home.why.subtitle':
    'Tunachanganya ujuzi wa ndani na kujitolea kwa ubora thabiti katika kila hatua.',
  'home.why.quality.title': 'Ubora kwanza',
  'home.why.quality.description':
    'Kila bidhaa inashughulikiwa kwa uangalifu na kuzingatia matokeo ya kuaminika.',
  'home.why.local.title': 'Utaalamu wa ndani',
  'home.why.local.description':
    'Tunaelewa kilimo cha Tanzania na hali halisi za wateja tunaowahudumia.',
  'home.why.supply.title': 'Ugavi wa kuaminika',
  'home.why.supply.description':
    'Tunafanya kazi ili bidhaa muhimu ziwe zinapatikana wakati wakulima na familia wanazihitaji.',
  'home.why.service.title': 'Huduma kwa lugha mbili',
  'home.why.service.description': 'Timu yetu inahudumia wateja kwa Kiingereza na Kiswahili.',

  'home.cta.eyebrow': 'Tukue pamoja',
  'home.cta.title': 'Uko tayari kukua na YES GROUP?',
  'home.cta.subtitle':
    'Tuambie unachohitaji na timu yetu itakusaidia kupata suluhisho sahihi.',
  'home.cta.button': 'Anzisha mazungumzo',

  'products.eyebrow': 'Katalogi',
  'products.title': 'Bidhaa kwa mashamba, familia na biashara',
  'products.subtitle':
    'Vinjari bidhaa zetu za mbolea, miche ya kahawa, chakula cha mifugo na mafuta ya alizeti.',
  'products.searchPlaceholder': 'Tafuta kwa jina la bidhaa',
  'products.filterCategory': 'Kategoria',
  'products.filterStatus': 'Upatikanaji',
  'products.filtersLabel': 'Vichujio vya bidhaa',
  'products.results': 'Bidhaa {count} zimepatikana',
  'products.resultsOne': 'Bidhaa 1 imepatikana',
  'products.empty.title': 'Hakuna bidhaa zilizopatikana',
  'products.empty.text': 'Jaribu neno lingine la utafutaji au ondoa vichujio.',
  'products.error.title': 'Hatukuweza kupakia katalogi',
  'products.error.text': 'Tafadhali angalia muunganisho wako na ujaribu tena.',
  'products.pageInfo': 'Ukurasa {page} kati ya {pages}',

  'product.status.ACTIVE': 'Inapatikana',
  'product.status.INACTIVE': 'Haipatikani',
  'product.status.OUT_OF_STOCK': 'Imeisha ghalani',
  'product.status': 'Upatikanaji',
  'product.details': 'Maelezo ya bidhaa',
  'product.description': 'Maelezo',
  'product.noDescription': 'Wasiliana nasi kwa maelezo zaidi kuhusu bidhaa hii.',
  'product.category': 'Kategoria',
  'product.unit': 'Kipimo',
  'product.stock': 'Hisa',
  'product.stockValue': '{count} zipo',
  'product.price': 'Bei',
  'product.inStock': 'Ipo ghalani',
  'product.outOfStock': 'Kwa sasa imeisha ghalani',
  'product.related': 'Unaweza pia kupenda',
  'product.notFound.title': 'Bidhaa haipatikani',
  'product.notFound.text': 'Bidhaa unayotafuta huenda imehamishwa au haipatikani tena.',
  'product.error.title': 'Hatukuweza kupakia bidhaa hii',
  'product.error.text': 'Tafadhali jaribu tena baada ya muda mfupi.',
  'product.imageAlt': 'Picha ya {name}',
  'product.contactCta.title': 'Unahitaji msaada kuchagua?',
  'product.contactCta.text':
    'Timu yetu inaweza kujibu maswali kuhusu upatikanaji, bei na ugavi.',
  'product.contactCta.button': 'Uliza kuhusu bidhaa hii',

  'about.eyebrow': 'Kuhusu YES GROUP',
  'about.title': 'Tumejikita Tanzania. Tunakua na jamii zetu.',
  'about.subtitle':
    'YES GROUP ni kampuni ya Tanzania inayojikita katika bidhaa za vitendo na ushirikiano wa muda mrefu.',
  'about.story.title': 'Historia yetu',
  'about.story.p1':
    'YES GROUP inafanya kazi katika kilimo na mahitaji ya kila siku. Vitengo vyetu vinne — uzalishaji wa mbolea, miche ya kahawa, chakula cha mifugo na mafuta ya alizeti — vinaonyesha imani yetu kwamba uzalishaji imara wa ndani huleta thamani ya kudumu.',
  'about.story.p2':
    'Tunahudumia wakulima, familia, wauzaji rejareja na biashara kwa bidhaa muhimu, za kuaminika na zinazosaidiwa na timu inayoelewa jamii tunazofanyia kazi.',
  'about.mission.title': 'Dhamira yetu',
  'about.mission.text':
    'Kutoa bidhaa bora za kilimo na mahitaji muhimu zinazosaidia watu na biashara kustawi.',
  'about.vision.title': 'Maono yetu',
  'about.vision.text':
    'Kuwa mshirika wa kuaminika wa Tanzania kwa ukuaji endelevu, kutoka udongoni hadi nyumbani.',
  'about.values.title': 'Kinachotuongoza',
  'about.value.quality.title': 'Ubora',
  'about.value.quality.text':
    'Tunajivunia kufanya mambo ipasavyo na kutoa bidhaa ambazo watu wanaweza kuzitegemea.',
  'about.value.integrity.title': 'Uadilifu',
  'about.value.integrity.text':
    'Tunajenga mahusiano kwa uaminifu, uthabiti na heshima.',
  'about.value.community.title': 'Jamii',
  'about.value.community.text':
    'Tunakua kwa kusaidia wakulima, familia na biashara zinazotuzunguka.',
  'about.value.innovation.title': 'Maendeleo',
  'about.value.innovation.text':
    'Tunatafuta njia bora za kuwahudumia wateja wetu na kutumia rasilimali za ndani vizuri.',
  'about.cta.title': 'Fanya kazi na timu inayoelewa ardhi chini ya miguu yako.',
  'about.cta.text':
    'Iwe unapanga shamba, unajaza duka au unatafuta mshirika wa ugavi wa kuaminika, tungependa kusikia kutoka kwako.',

  'contact.eyebrow': 'Mawasiliano',
  'contact.title': 'Tuzungumzie unachohitaji.',
  'contact.subtitle':
    'Wasiliana na timu yetu kwa taarifa za bidhaa, maombi ya ugavi au fursa za ushirikiano.',
  'contact.info.title': 'Taarifa za mawasiliano',
  'contact.hours.value': 'Jumatatu–Ijumaa, 8:00–17:00',
  'contact.form.title': 'Tuma swali',
  'contact.form.intro':
    'Kamilisha fomu na programu yako ya barua pepe itafunguka na ujumbe ukiwa tayari kutumwa.',
  'contact.form.name': 'Jina kamili',
  'contact.form.email': 'Barua pepe',
  'contact.form.phone': 'Namba ya simu',
  'contact.form.subject': 'Mada',
  'contact.form.message': 'Ujumbe',
  'contact.form.placeholder.name': 'Jina lako',
  'contact.form.placeholder.email': 'wewe@example.com',
  'contact.form.placeholder.phone': '+255 ...',
  'contact.form.placeholder.subject': 'Tunaweza kukusaidiaje?',
  'contact.form.placeholder.message': 'Tuambie kidogo kuhusu swali lako.',
  'contact.form.send': 'Fungua barua pepe',
  'contact.form.defaultSubject': 'Swali kutoka tovuti',
  'contact.form.success':
    'Programu yako ya barua pepe imefunguliwa. Ikiwa haikufunguka, tutumie barua pepe moja kwa moja kwa {email}.',
  'contact.form.invalidEmail': 'Weka barua pepe sahihi',

  'footer.about':
    'YES GROUP inazalisha mbolea, miche ya kahawa, chakula cha mifugo na mafuta ya alizeti kwa wateja kote Tanzania.',
  'footer.quickLinks': 'Gundua',
  'footer.divisions': 'Vitengo vyetu',
  'footer.contact': 'Mawasiliano',
  'footer.rights': '© {year} YES GROUP. Haki zote zimehifadhiwa.',
  'footer.language': 'Inapatikana kwa Kiingereza na Kiswahili',

  'notFound.title': 'Ukurasa haupatikani',
  'notFound.text': 'Ukurasa unaoutafuta haupo au umehamishwa.',
  'notFound.button': 'Rudi nyumbani',

  'errors.api': 'Imeshindwa kufikia seva. Tafadhali jaribu tena.',
  'errors.categories': 'Kategoria hazipatikani kwa sasa.'
};

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en,
  sw
};
