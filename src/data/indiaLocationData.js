// India Location Data — All States + UTs → Districts → Villages
// Source: Census 2011 administrative units + common agri references

export const INDIA_STATES = {
  "Andhra Pradesh": {
    districts: {
      "Visakhapatnam": ["Visakhapatnam City","Bheemunipatnam","Anakapalle","Paderu","Narsipatnam","Atchutapuram","Bhimili"],
      "East Godavari": ["Kakinada","Rajahmundry","Amalapuram","Pithapuram","Ramachandrapuram","Tuni","Mandapeta"],
      "West Godavari": ["Eluru","Bhimavaram","Tanuku","Narsapur","Palakol","Kovvur","Jangaraipeta"],
      "Krishna": ["Vijayawada","Machilipatnam","Gudivada","Nuzvid","Nandigama","Jaggayyapeta","Tiruvuru"],
      "Guntur": ["Guntur","Tenali","Narasaraopet","Chirala","Macherla","Sattenapalle","Ponnur"],
      "Prakasam": ["Ongole","Markapur","Giddalur","Kandukur","Chirala","Addanki","Podili"],
      "Nellore": ["Nellore","Kavali","Gudur","Sullurpeta","Atmakur","Venkatagiri","Bitragunta"],
      "Chittoor": ["Chittoor","Tirupati","Madanapalle","Puttur","Nagari","Srikalahasti","Pileru"],
      "Kadapa": ["Kadapa","Proddatur","Rajampet","Jammalamadugu","Pulivendula","Badvel","Mydukur"],
      "Kurnool": ["Kurnool","Nandyal","Adoni","Dhone","Alur","Nandikotkur","Pattikonda"],
      "Anantapur": ["Anantapur","Guntakal","Hindupur","Tadipatri","Dharmavaram","Kadiri","Rayadurgam"],
      "Srikakulam": ["Srikakulam","Amadalavalasa","Palakonda","Rajam","Narasannapeta","Etcherla","Tekkali"],
      "Vizianagaram": ["Vizianagaram","Bobbili","Parvathipuram","Salur","Gajapathinagaram","Bondapalli","Cheepurupalli"],
      "Alluri Sitharama Raju": ["Paderu","Araku Valley","Chintapalle","Munchingput","Addateegala"],
      "Eluru": ["Eluru","Tadepalligudem","Narasapuram","Tanuku","Palakol"],
    }
  },
  "Arunachal Pradesh": {
    districts: {
      "Itanagar": ["Itanagar","Naharlagun","Nirjuli","Banderdewa"],
      "Tawang": ["Tawang","Lumla","Bap","Kitpi"],
      "West Kameng": ["Bomdila","Dirang","Rupa","Nafra"],
      "East Kameng": ["Seppa","Bana","Pakke-Kessang"],
      "Papum Pare": ["Yupia","Sagalee","Balijan","Doimukh"],
      "Kurung Kumey": ["Koloriang","Palin","Sarli","Chayangkang"],
      "Upper Subansiri": ["Ziro","Daporijo","Sarli"],
      "Lower Subansiri": ["Ziro","Daporijo","Bamin Mara"],
      "Dibang Valley": ["Anini","Etalin","Mipi"],
      "Lohit": ["Tezu","Namsai","Dong"],
      "Tirap": ["Khonsa","Deomali","Borduria"],
      "Changlang": ["Changlang","Miao","Bordumsa"],
      "East Siang": ["Pasighat","Ruksin","Rottung"],
      "West Siang": ["Along","Mechuka","Yomcha"],
    }
  },
  "Assam": {
    districts: {
      "Kamrup Metro": ["Guwahati","Dispur","Azara","Jalukbari","Sonapur","Rangia","Gorchuk"],
      "Kamrup": ["Chamaria","Boko","Chaygaon","Hajo","Rampur","Nagarbera"],
      "Dibrugarh": ["Dibrugarh","Jhanji","Moran","Chabua","Duliajan","Khowang","Lahowal"],
      "Jorhat": ["Jorhat","Mariani","Titabor","Teok","Borhola","Pulibor"],
      "Sivasagar": ["Sivasagar","Nazira","Golaghat","Demow","Amguri"],
      "Tinsukia": ["Tinsukia","Digboi","Margherita","Makum","Bordubi"],
      "Lakhimpur": ["Lakhimpur (North)","Dhakuakhana","Bihpuria","Narayanpur","Boginadi"],
      "Golaghat": ["Golaghat","Sarupathar","Bokakhat","Dergaon","Raha"],
      "Nagaon": ["Nagaon","Doboka","Hojai","Juria","Lumding"],
      "Morigaon": ["Morigaon","Jagiroad","Mayang","Laharighat"],
      "Cachar": ["Silchar","Katigorah","Udharbond","Lakhipur","Sonai"],
      "Barpeta": ["Barpeta","Pathsala","Sarukhetri","Mandia","Jania"],
      "Darrang": ["Mangaldoi","Sipajhar","Dalgaon","Kalaigaon"],
      "Sonitpur": ["Tezpur","Dhekiajuli","Biswanath","Gohpur","Borgolai"],
      "Bongaigaon": ["Bongaigaon","Boitamari","Bijnipath","Abhayapuri"],
    }
  },
  "Bihar": {
    districts: {
      "Patna": ["Patna City","Danapur","Fatuha","Khagaul","Phulwari","Sampatchak","Masaurhi"],
      "Gaya": ["Gaya","Bodh Gaya","Sherghati","Nababganj","Imamganj","Belaganj"],
      "Bhagalpur": ["Bhagalpur","Sultanganj","Naugachia","Kahalgaon","Pirpainti"],
      "Muzaffarpur": ["Muzaffarpur","Bochahan","Sakra","Paroo","Motipur","Gaighat"],
      "Darbhanga": ["Darbhanga","Benipur","Manigachhi","Baheri","Jale","Singhwara"],
      "Purnia": ["Purnia","Kasba","Damdaha","Baisi","Rupauli"],
      "Saran": ["Sonepur","Chapra","Chhapra","Marhaura","Maker","Parsa"],
      "Siwan": ["Siwan","Mairwa","Maharajganj","Husainganj","Basantpur"],
      "Gopalganj": ["Gopalganj","Thawe","Uchkagaon","Bhorey","Phulwaria"],
      "Begusarai": ["Begusarai","Barauni","Teghra","Bachhwara","Manjhaul"],
      "Nalanda": ["Biharsharif","Rajgir","Islampur","Harnaut","Silao","Asthawan"],
      "Munger": ["Munger","Jamalpur","Kharagpur","Tarapur","Dharhara"],
      "Vaishali": ["Hajipur","Patepur","Mahua","Jandaha","Desri"],
      "East Champaran": ["Motihari","Bettiah","Raxaul","Sugauli","Areraj"],
      "West Champaran": ["Bettiah","Narkatiaganj","Bagaha","Ramnagar","Chanpatia"],
    }
  },
  "Chhattisgarh": {
    districts: {
      "Raipur": ["Raipur","Arang","Abhanpur","Tilda","Dharsiwa"],
      "Bilaspur": ["Bilaspur","Gaurela","Pendra","Kota","Takhatpur"],
      "Durg": ["Durg","Bhilai","Patan","Dhundhari","Kumhari"],
      "Rajnandgaon": ["Rajnandgaon","Dongargarh","Khairagarh","Chuikhadan"],
      "Korba": ["Korba","Katghora","Pali","Kartala","Balco"],
      "Jagdalpur": ["Jagdalpur","Bastar","Tokapal","Bakavand","Lohandiguda"],
      "Surguja": ["Ambikapur","Surajpur","Baikunthpur","Lundra"],
      "Kanker": ["Kanker","Bhanupratappur","Antagarh","Pakhanjur"],
      "Dantewada": ["Dantewada","Bacheli","Kirandul","Barsur","Bijapur"],
    }
  },
  "Goa": {
    districts: {
      "North Goa": ["Panaji","Mapusa","Bicholim","Calangute","Candolim","Pernem","Sattari"],
      "South Goa": ["Margao","Ponda","Vasco","Curchorem","Sanvordem","Quepem","Dharbandora"],
    }
  },
  "Gujarat": {
    districts: {
      "Ahmedabad": ["Ahmedabad","Gandhinagar","Sanand","Bavla","Daskroi","Dholka","Viramgam"],
      "Surat": ["Surat","Bardoli","Mandvi","Umarpada","Mahuva","Olpad"],
      "Vadodara": ["Vadodara","Anand","Karjan","Dabhoi","Padra","Waghodiya"],
      "Rajkot": ["Rajkot","Gondal","Jetpur","Upleta","Paddhari","Kotda Sangani"],
      "Bhavnagar": ["Bhavnagar","Gariadhar","Palitana","Sihor","Vallabhipur","Mahuva"],
      "Jamnagar": ["Jamnagar","Dwarka","Khambhalia","Kalavad","Lalpur"],
      "Junagadh": ["Junagadh","Veraval","Mangrol","Keshod","Una","Talala"],
      "Kutch": ["Bhuj","Gandhidham","Anjar","Mundra","Nakhatrana","Rapar","Lakhpat"],
      "Banaskantha": ["Palanpur","Deesa","Tharad","Radhanpur","Vadgam","Dhanera"],
      "Patan": ["Patan","Sidhpur","Chanasma","Harij","Radhanpur"],
      "Mehsana": ["Mehsana","Visnagar","Kadi","Unjha","Becharaji","Kalol"],
      "Anand": ["Anand","Nadiad","Vallabh Vidyanagar","Petlad","Sojitra"],
      "Kheda": ["Nadiad","Kheda","Kapadvanj","Matar","Thasra"],
      "Narmada": ["Rajpipla","Sagbara","Tilakwada","Nandod"],
    }
  },
  "Haryana": {
    districts: {
      "Gurugram": ["Gurugram","Farrukhnagar","Pataudi","Sohna","Badshahpur","Manesar"],
      "Hisar": ["Hisar","Hansi","Barwala","Narnaund","Uklana","Adampur"],
      "Ambala": ["Ambala","Naraingarh","Barara","Mullana","Shahzadpur"],
      "Karnal": ["Karnal","Panipat","Indri","Gharaunda","Nilokheri","Assandh"],
      "Sonipat": ["Sonipat","Gohana","Kharkhoda","Rai","Mundlana","Ganaur"],
      "Rohtak": ["Rohtak","Maham","Kalanaur","Sampla","Lakhan Majra"],
      "Faridabad": ["Faridabad","Ballabhgarh","Tigaon","Palwal","Hathin"],
      "Jhajjar": ["Jhajjar","Beri","Bahadurgarh","Machhrauli","Badli"],
      "Jind": ["Jind","Narwana","Safidon","Julana","Uchana"],
      "Kaithal": ["Kaithal","Cheeka","Guhla","Pundri","Siwan"],
      "Kurukshetra": ["Kurukshetra","Shahabad","Thanesar(M)","Pehowa","Babain","Ladwa"],
      "Sirsa": ["Sirsa","Dabwali","Ellenabad","Rania","Nohar","Kalanwali"],
      "Fatehabad": ["Fatehabad","Tohana","Bhattu","Ratia","Bhuna"],
      "Mahendragarh": ["Narnaul","Ateli","Kanina","Mahendragarh","Satnali"],
      "Rewari": ["Rewari","Kosli","Dharuhera","Bawal","Jatusana"],
    }
  },
  "Himachal Pradesh": {
    districts: {
      "Shimla": ["Shimla","Rampur","Rohru","Chopal","Theog","Kumarsain"],
      "Kangra": ["Dharamsala","Palampur","Baijnath","Nurpur","Jawali","Dehra"],
      "Kullu": ["Kullu","Manali","Banjar","Anni","Nirmand"],
      "Mandi": ["Mandi","Sundarnagar","Jogindernagar","Sarkaghat","Chachyot"],
      "Sirmaur": ["Nahan","Paonta Sahib","Shillai","Sangrah","Rajgarh"],
      "Solan": ["Solan","Baddi","Nalagarh","Kasauli","Arki","Darlaghat"],
      "Bilaspur": ["Bilaspur","Ghumarwin","Namhol","Naina Devi"],
      "Hamirpur": ["Hamirpur","Nadaun","Sujanpur","Barsar","Bhoranj"],
      "Una": ["Una","Haroli","Bangana","Amb","Gagret"],
      "Chamba": ["Chamba","Dalhousie","Churah","Saho","Bhattiyat"],
      "Lahaul & Spiti": ["Keylong","Kaza","Losar","Tabo","Sumdo"],
      "Kinnaur": ["Reckong Peo","Kalpa","Nichar","Pooh","Moorang"],
    }
  },
  "Jharkhand": {
    districts: {
      "Ranchi": ["Ranchi","Namkum","Kanke","Ormanjhi","Angara"],
      "Dhanbad": ["Dhanbad","Jharia","Topchanchi","Chirkunda","Govindpur"],
      "Jamshedpur": ["Jamshedpur","Mango","Jugsalai","Boram","Potka"],
      "Bokaro": ["Bokaro","Chas","Gomia","Petarbar","Chandankiyari"],
      "Hazaribagh": ["Hazaribagh","Barkagaon","Ichak","Churchu"],
      "Giridih": ["Giridih","Dumri","Tisri","Bagodar","Birni"],
      "Koderma": ["Koderma","Jainagar","Markacho","Domchanch"],
      "Palamu": ["Medininagar","Hussainabad","Chainpur","Latehar","Bishrampur"],
      "Gumla": ["Gumla","Chainpur","Simdega","Basia","Bharno"],
    }
  },
  "Karnataka": {
    districts: {
      "Bengaluru Urban": ["Bengaluru","Yelahanka","Bommanahalli","Rajarajeshwari","Dasarahalli"],
      "Bengaluru Rural": ["Nelamangala","Hosakote","Doddaballapur","Devanahalli","Hoskote"],
      "Mysuru": ["Mysuru","Nanjangud","Hunsur","Piriyapatna","Krishnarajanagara","T Narasipur"],
      "Mangaluru": ["Mangaluru","Udupi","Surathkal","Mulki","Puttur","Sullia"],
      "Belagavi": ["Belagavi","Gokak","Chikkodi","Bailhongal","Hukkeri","Raibag"],
      "Hubballi-Dharwad": ["Hubballi","Dharwad","Navalgund","Kundgol","Kalghatgi"],
      "Kalaburagi": ["Kalaburagi","Yadgir","Shahapur","Sedam","Afzalpur","Chitapur"],
      "Vijayapura": ["Vijayapura","Muddebihal","Sindagi","Basavana Bagewadi","Indi"],
      "Ballari": ["Ballari","Hospet","Sandur","Hadagalli","Kushtagi","Harapanahalli"],
      "Tumakuru": ["Tumakuru","Tiptur","Gubbi","Turuvekere","Madhugiri","Pavagada"],
      "Shivamogga": ["Shivamogga","Sagar","Bhadravati","Thirthahalli","Soraba"],
      "Dakshina Kannada": ["Mangaluru","Bantval","Belthangady","Puttur","Sullia","Ullal"],
      "Hassan": ["Hassan","Sakleshpur","Belur","Arsikere","Channarayapatna"],
      "Chikkamagaluru": ["Chikkamagaluru","Kadur","Mudigere","Sringeri","Tarikere"],
      "Raichur": ["Raichur","Sindhanur","Manvi","Devadurga","Lingasugur"],
    }
  },
  "Kerala": {
    districts: {
      "Thiruvananthapuram": ["Thiruvananthapuram","Neyyattinkara","Attingal","Nedumangad","Varkala","Kazhakoottam"],
      "Kollam": ["Kollam","Kottarakkara","Punalur","Paravur","Karunagappally","Kadakkal"],
      "Pathanamthitta": ["Pathanamthitta","Adoor","Thiruvalla","Ranni","Kozhencherry","Konni"],
      "Alappuzha": ["Alappuzha","Chengannur","Kayamkulam","Haripad","Mavelikkara","Cherthala"],
      "Kottayam": ["Kottayam","Pala","Changanacherry","Ettumannoor","Vaikom","Kanjirappally"],
      "Idukki": ["Thodupuzha","Munnar","Devikulam","Adimali","Kattappana","Peerumade"],
      "Ernakulam": ["Kochi","Angamaly","Aluva","Perumbavoor","Muvattupuzha","Kothamangalam"],
      "Thrissur": ["Thrissur","Chalakudy","Irinjalakuda","Kodungallur","Guruvayur","Kunnamkulam"],
      "Palakkad": ["Palakkad","Ottapalam","Shoranur","Mannarkkad","Chittur","Alathur"],
      "Malappuram": ["Malappuram","Tirur","Manjeri","Perinthalmanna","Kondotty","Nilambur"],
      "Kozhikode": ["Kozhikode","Vatakara","Koyilandy","Quilandy","Vadakara","Perambra"],
      "Wayanad": ["Kalpetta","Mananthavady","Sulthan Bathery","Vythiri","Panamaram"],
      "Kannur": ["Kannur","Thalassery","Iritty","Koothuparamba","Mattannur","Payyannur"],
      "Kasaragod": ["Kasaragod","Kanhangad","Hosdurg","Nileshwaram","Vorkady","Cheruvathur"],
    }
  },
  "Madhya Pradesh": {
    districts: {
      "Bhopal": ["Bhopal","Huzur","Berasia","Phanda","Sehore"],
      "Indore": ["Indore","Depalpur","Sanwer","Mhow","Hatod","Gautampura"],
      "Jabalpur": ["Jabalpur","Sihora","Patan","Majhauli","Katni"],
      "Gwalior": ["Gwalior","Morar","Lashkar","Bhitarwar","Dabra"],
      "Ujjain": ["Ujjain","Nagda","Khachrod","Mahidpur","Tarana","Badnagar"],
      "Sagar": ["Sagar","Bina","Khurai","Rahatgarh","Banda","Rehli"],
      "Rewa": ["Rewa","Sidhi","Gurh","Deotalab","Mauganj","Teonthar"],
      "Satna": ["Satna","Nagod","Maihar","Uchhahara","Rampur Baghelan"],
      "Chhindwara": ["Chhindwara","Sausar","Pandhurna","Chaurai","Tamia"],
      "Hoshangabad": ["Itarsi","Hoshangabad","Sohagpur","Pipariya","Babai"],
      "Ratlam": ["Ratlam","Jaora","Alote","Sailana","Piploda"],
      "Mandsaur": ["Mandsaur","Neemuch","Manasa","Garoth","Sitamau"],
      "Dewas": ["Dewas","Khategaon","Sonkatch","Kannod","Tonk Khurd"],
      "Khandwa": ["Khandwa","Burhanpur","Khalwa","Harsud"],
      "Shivpuri": ["Shivpuri","Kolaras","Pichhore","Khaniyadhana","Sheopur"],
    }
  },
  "Maharashtra": {
    districts: {
      "Mumbai": ["Fort","Chembur","Kurla","Dharavi","Worli","Andheri","Borivali"],
      "Pune": ["Pune City","Pimpri","Chinchwad","Hadapsar","Kothrud","Baramati","Shirur","Maval"],
      "Nashik": ["Nashik","Deolali","Malegaon","Igatpuri","Sinnar","Nifad","Yeola"],
      "Aurangabad": ["Aurangabad","Paithan","Kannad","Khuldabad","Gangapur","Vaijapur"],
      "Solapur": ["Solapur","Pandharpur","Barshi","Akkalkot","Mangalwedha","Madha"],
      "Kolhapur": ["Kolhapur","Ichalkaranji","Hatkanangle","Karvir","Panhala","Shahuwadi"],
      "Satara": ["Satara","Karad","Panchgani","Wai","Khatav","Koregaon","Patan"],
      "Sangli": ["Sangli","Miraj","Tasgaon","Jat","Khanapur","Walwa"],
      "Nagpur": ["Nagpur","Kamptee","Butibori","Hingna","Ramtek","Parseoni"],
      "Amravati": ["Amravati","Achalpur","Daryapur","Morshi","Chandurbazar"],
      "Yavatmal": ["Yavatmal","Wani","Pusad","Umarkhed","Mahagaon","Kalamb"],
      "Chandrapur": ["Chandrapur","Warora","Ballarpur","Rajura","Gondpipri","Mul"],
      "Gadchiroli": ["Gadchiroli","Aheri","Etapalli","Sironcha","Dhanora"],
      "Beed": ["Beed","Ambajogai","Kaij","Georai","Ashti","Manjlegaon"],
      "Latur": ["Latur","Osmanabad","Udgir","Ausa","Chakur","Deoni"],
    }
  },
  "Manipur": {
    districts: {
      "Imphal West": ["Imphal","Lamphelpat","Yaiskul","Singjamei","Khurai"],
      "Imphal East": ["Porompat","Sangaithel","Keishampat","Heingang","Lamlai"],
      "Bishnupur": ["Bishnupur","Nambol","Moirang","Kumbi","Oinam"],
      "Thoubal": ["Thoubal","Kakching","Wangjing","Lilong","Yairipok"],
      "Senapati": ["Senapati","Mao","Maram","Paomata","Saitu"],
      "Ukhrul": ["Ukhrul","Chingai","Kasom Khullen","Phungyar","Sadu"],
      "Chandel": ["Chandel","Moreh","Chakpikarong","Tengnoupal"],
      "Churachandpur": ["Churachandpur","Saikot","Tipaimukh","Thanlon"],
    }
  },
  "Meghalaya": {
    districts: {
      "East Khasi Hills": ["Shillong","Cherrapunji","Mawkyrwat","Mawlai","Nongthymmai"],
      "West Khasi Hills": ["Nongstoin","Mairang","Mawkyrwat","Ranikor"],
      "Ri Bhoi": ["Nongpoh","Umsning","Umroi","Byrnihat"],
      "Jaintia Hills": ["Jowai","Amlarem","Khandong","Shallang"],
      "East Garo Hills": ["Williamnagar","Resubelpara","Mendipathar"],
      "West Garo Hills": ["Tura","Phulbari","Bajengdoba","Dalu"],
      "South Garo Hills": ["Baghmara","Ampati","Mahendraganj"],
    }
  },
  "Mizoram": {
    districts: {
      "Aizawl": ["Aizawl","Durtlang","Tlangnuam","Zemabawk","Bawngkawn"],
      "Lunglei": ["Lunglei","Lawngtlai","Chawngte","Sangau","Hnahthial"],
      "Champhai": ["Champhai","Khawzawl","Ngopa","Teikhang"],
      "Kolasib": ["Kolasib","Thingdawl","Bilkhawthlir","North Thingdawl"],
      "Mamit": ["Mamit","West Phaileng","North West","Zamuang"],
      "Serchhip": ["Serchhip","Thenzawl","North Vanlaiphai","Buarpui"],
    }
  },
  "Nagaland": {
    districts: {
      "Kohima": ["Kohima","Phesama","Jotsoma","Kezocha","Chumukedima"],
      "Dimapur": ["Dimapur","Chumoukedima","Medziphema","Niuland"],
      "Mokokchung": ["Mokokchung","Longtrok","Changtongya","Tuli"],
      "Wokha": ["Wokha","Bhandari","Sanis","Ralan"],
      "Zunheboto": ["Zunheboto","Akuluto","Pughoboto","Satakha"],
      "Phek": ["Phek","Pfutsero","Meluri","Chozuba"],
      "Mon": ["Mon","Tizit","Tobu","Longwa","Aboi"],
      "Tuensang": ["Tuensang","Noklak","Shamator","Longkhim"],
    }
  },
  "Odisha": {
    districts: {
      "Khordha": ["Bhubaneswar","Puri","Jatni","Khordha","Banapur","Chilika"],
      "Cuttack": ["Cuttack","Choudwar","Athmallik","Banki","Baramba","Niali"],
      "Ganjam": ["Berhampur","Bhanjanagar","Chhatrapur","Aska","Sheragada","Digapahandi"],
      "Sundargarh": ["Rourkela","Sundargarh","Rajgangpur","Bonai","Birmitrapur"],
      "Sambalpur": ["Sambalpur","Burla","Jharsuguda","Rairakhol","Kuchinda"],
      "Balasore": ["Balasore","Basta","Nilagiri","Soro","Jaleswar","Remuna"],
      "Mayurbhanj": ["Baripada","Rairangpur","Bangriposi","Udala","Bahalda","Karanjia"],
      "Dhenkanal": ["Dhenkanal","Hindol","Bhuban","Kamakhyanagar","Parjang"],
      "Angul": ["Angul","Talcher","Banarpal","Chhendipada","Pallahara","Athamallik"],
      "Koraput": ["Koraput","Jeypore","Rayagada","Malkangiri","Nabarangpur"],
      "Balangir": ["Balangir","Titilagarh","Kantabanji","Patnagarh","Saintala"],
      "Bargarh": ["Bargarh","Padampur","Bhatli","Sohela","Attabira"],
    }
  },
  "Punjab": {
    districts: {
      "Ludhiana": ["Ludhiana","Khanna","Jagraon","Raikot","Machhiwara","Samrala"],
      "Amritsar": ["Amritsar","Attari","Ajnala","Baba Bakala","Raja Sansi","Tarn Taran"],
      "Jalandhar": ["Jalandhar","Nakodar","Phillaur","Shahkot","Nurmahal"],
      "Patiala": ["Patiala","Rajpura","Nabha","Sangrur","Barnala","Patran"],
      "Bathinda": ["Bathinda","Mansa","Goniana","Rampura Phul","Bhagta Bhaika"],
      "Mohali": ["Mohali","Kharar","Dera Bassi","Boothgarh","Lalru"],
      "Hoshiarpur": ["Hoshiarpur","Phagwara","Garhshankar","Mahilpur","Mukerian"],
      "Gurdaspur": ["Gurdaspur","Pathankot","Batala","Qadian","Dhariwal"],
      "Firozpur": ["Firozpur","Fazilka","Zira","Jalalabad","Mamdot"],
      "Rupnagar": ["Rupnagar","Anandpur Sahib","Morinda","Chamkaur Sahib"],
      "Fatehgarh Sahib": ["Fatehgarh Sahib","Amloh","Bassi Pathana","Khamano","Sirhind"],
      "Faridkot": ["Faridkot","Kotkapura","Jaitu","Sadiq","Baghapurana"],
    }
  },
  "Rajasthan": {
    districts: {
      "Jaipur": ["Jaipur","Amer","Sanganer","Bassi","Shahpura","Chomu","Phulera"],
      "Jodhpur": ["Jodhpur","Phalodi","Balesar","Luni","Pipar City","Bilara"],
      "Udaipur": ["Udaipur","Rajsamand","Nathdwara","Vallabhnagar","Gogunda","Kherwara"],
      "Kota": ["Kota","Baran","Bundi","Ramganj Mandi","Sultanpur","Sangod"],
      "Ajmer": ["Ajmer","Beawar","Nasirabad","Kishangarh","Pushkar","Bijainagar"],
      "Bikaner": ["Bikaner","Lunkaransar","Nokha","Chhatargarh","Khajuwala"],
      "Alwar": ["Alwar","Bhiwadi","Rajgarh","Ramgarh","Kishangarh Bas","Tijara"],
      "Sri Ganganagar": ["Sri Ganganagar","Suratgarh","Raisinghnagar","Sadulshahar","Gharsana"],
      "Sikar": ["Sikar","Fatehpur","Lachhmangarh","Neem Ka Thana","Khandela"],
      "Nagaur": ["Nagaur","Makrana","Didwana","Ladnun","Merta"],
      "Pali": ["Pali","Marwar Junction","Bali","Sumerpur","Rani"],
      "Jaisalmer": ["Jaisalmer","Sam","Pokaran","Nachna","Fatehgarh"],
      "Barmer": ["Barmer","Balotra","Sheo","Pachpadra","Siwana"],
      "Jhalawar": ["Jhalawar","Bhawanimandi","Khanpur","Pirawa","Aklera"],
    }
  },
  "Sikkim": {
    districts: {
      "Gangtok": ["Gangtok","Ranipool","Pakyong","Tumin","Rongli"],
      "Namchi": ["Namchi","Jorethang","Ravangla","Temi","Yangang"],
      "Mangan": ["Mangan","Chungthang","Lachen","Lachung","Dzongu"],
      "Gyalshing": ["Gyalshing","Pelling","Dentam","Soreng"],
    }
  },
  "Tamil Nadu": {
    districts: {
      "Chennai": ["Chennai Central","T Nagar","Adyar","Anna Nagar","Tambaram","Avadi","Ambattur"],
      "Coimbatore": ["Coimbatore","Tiruppur","Pollachi","Mettupalayam","Gudalur","Annur"],
      "Madurai": ["Madurai","Dindigul","Theni","Usilampatti","Peraiyur","Vadipatti"],
      "Tiruchirappalli": ["Tiruchirappalli","Thanjavur","Kumbakonam","Ariyalur","Lalgudi","Musiri"],
      "Salem": ["Salem","Mettur","Omalur","Sankari","Attur","Vazhapadi"],
      "Tirunelveli": ["Tirunelveli","Nagercoil","Tuticorin","Sankarankovil","Tenkasi","Palayamkottai"],
      "Vellore": ["Vellore","Ranipet","Ambur","Arani","Gudiyatham","Vaniyambadi"],
      "Erode": ["Erode","Bhavani","Perundurai","Gobichettipalayam","Anthiyur","Sathyamangalam"],
      "Villupuram": ["Villupuram","Tindivanam","Gingee","Kallakurichi","Ulundurpet"],
      "Cuddalore": ["Cuddalore","Chidambaram","Panruti","Virudhachalam","Kurinjipadi"],
      "Kancheepuram": ["Kancheepuram","Maraimalai Nagar","Uthiramerur","Chengalpattu","Sriperumbudur"],
      "The Nilgiris": ["Ooty","Coonoor","Gudalur","Kotagiri","Lovedale","Yellanalli"],
      "Dharmapuri": ["Dharmapuri","Palacode","Harur","Pennagaram","Mathur"],
      "Krishnagiri": ["Krishnagiri","Denkanikottai","Hosur","Pochampalli","Bargur"],
    }
  },
  "Telangana": {
    districts: {
      "Hyderabad": ["Hyderabad","Secunderabad","Banjara Hills","Jubilee Hills","LB Nagar","Malkajgiri"],
      "Rangareddy": ["Rangareddy","Hayathnagar","Ibrahimpatnam","Maheswaram","Shamshabad"],
      "Medchal": ["Keesara","Ghatkesar","Shamirpet","Malkajgiri","Alwal"],
      "Warangal Urban": ["Warangal","Hanamkonda","Kazipet","Narsampet"],
      "Warangal Rural": ["Mahabubabad","Parkal","Narsampet","Dornakal"],
      "Karimnagar": ["Karimnagar","Peddapalli","Ramagundam","Jagtial","Metpally","Korutla"],
      "Nizamabad": ["Nizamabad","Bodhan","Banswada","Armoor","Balkonda","Kamareddy"],
      "Khammam": ["Khammam","Kothagudem","Bhadrachalam","Sathupally","Palwancha"],
      "Nalgonda": ["Nalgonda","Miryalaguda","Suryapet","Kodad","Bhongir","Yadagirigutta"],
      "Mahbubnagar": ["Mahbubnagar","Wanaparthy","Narayanpet","Gadwal","Jadcherla"],
      "Adilabad": ["Adilabad","Mancherial","Utnoor","Nirmal","Luxettipet","Bhainsa"],
    }
  },
  "Tripura": {
    districts: {
      "West Tripura": ["Agartala","Mohanpur","Jirania","Hezamara","Bishalgarh"],
      "Dhalai": ["Ambassa","Kamalpur","Chailengta","Kulai"],
      "North Tripura": ["Dharmanagar","Kanchanpur","Panisagar","Kumarghat"],
      "South Tripura": ["Udaipur","Belonia","Sabroom","Rajnagar"],
      "Khowai": ["Khowai","Teliamura","Kalyanpur"],
      "Sipahijala": ["Bishalgarh","Sonamura","Melaghar","Charilam"],
    }
  },
  "Uttar Pradesh": {
    districts: {
      "Lucknow": ["Lucknow","Bakshi Ka Talab","Mohanlalganj","Manak Nagar","Sarojini Nagar"],
      "Kanpur Nagar": ["Kanpur","Govindnagar","Sarsaul","Bilhaur","Ghatampur"],
      "Agra": ["Agra","Fatehpur Sikri","Kheragarh","Bah","Etmadpur","Fatehabad"],
      "Varanasi": ["Varanasi","Sarnath","Ramnagar","Sewapuri","Arajiline"],
      "Allahabad (Prayagraj)": ["Prayagraj","Phulpur","Handia","Karchana","Meja","Soraon"],
      "Meerut": ["Meerut","Hapur","Ghaziabad","Modinagar","Pilkhuwa","Baghpat"],
      "Bareilly": ["Bareilly","Pilibhit","Shahjahanpur","Mirganj","Faridpur","Baheri"],
      "Mathura": ["Mathura","Vrindavan","Govardhan","Kosi Kalan","Chhata"],
      "Gorakhpur": ["Gorakhpur","Deoria","Mahrajganj","Kushinagar","Pipraich","Sahjanwa"],
      "Jhansi": ["Jhansi","Lalitpur","Jalaun","Orai","Moth","Chirgaon"],
      "Moradabad": ["Moradabad","Sambhal","Amroha","Rampur","Chandausi"],
      "Ghaziabad": ["Ghaziabad","Noida","Greater Noida","Dasna","Loni","Muradnagar"],
      "Saharanpur": ["Saharanpur","Muzaffarnagar","Shamli","Nakur","Gangoh","Deoband"],
      "Azamgarh": ["Azamgarh","Lalganj","Mehnagar","Atraulia","Phulpur","Sagri"],
      "Bulandshahr": ["Bulandshahr","Khurja","Shikarpur","Sikandrabad","Gulaothi"],
    }
  },
  "Uttarakhand": {
    districts: {
      "Dehradun": ["Dehradun","Rishikesh","Haridwar","Mussoorie","Vikasnagar","Doiwala"],
      "Haridwar": ["Haridwar","Roorkee","Laksar","Jwalapur","Manglaur","Narsan"],
      "Nainital": ["Nainital","Haldwani","Ramnagar","Bhimtal","Kaladhungi","Lalkuan"],
      "Udham Singh Nagar": ["Rudrapur","Kashipur","Kichha","Gadarpur","Bazpur","Jaspur"],
      "Tehri Garhwal": ["Tehri","New Tehri","Chamba","Dhanolti","Narendra Nagar","Kirti Nagar"],
      "Uttarkashi": ["Uttarkashi","Barkot","Purola","Mori","Dunda"],
      "Chamoli": ["Gopeshwar","Joshimath","Badrinath","Pipalkoti","Nandprayag"],
      "Rudraprayag": ["Rudraprayag","Ukhimath","Agastyamuni","Kedarnath"],
      "Almora": ["Almora","Ranikhet","Bageshwar","Chaukhutia","Tarikhet","Hawalbagh"],
      "Pithoragarh": ["Pithoragarh","Champawat","Didihat","Munsiyari","Dharchula"],
      "Pauri Garhwal": ["Pauri","Lansdowne","Kotdwar","Srinagar","Satpuli","Yamkeshwar"],
    }
  },
  "West Bengal": {
    districts: {
      "Kolkata": ["Kolkata","Dum Dum","Behala","Jadavpur","Salt Lake","Baranagar","Barrackpore"],
      "Howrah": ["Howrah","Uluberia","Bally","Domjur","Amta","Shyampur"],
      "North 24 Parganas": ["Barasat","Basirhat","Habra","Sodepur","Titagarh","Barrackpore"],
      "South 24 Parganas": ["Baruipur","Diamond Harbour","Kakdwip","Namkhana","Sagar","Jaynagar"],
      "Purba Medinipur": ["Tamluk","Haldia","Contai","Digha","Egra","Nandigram"],
      "Paschim Medinipur": ["Midnapore","Jhargram","Kharagpur","Ghatal","Daspur"],
      "Murshidabad": ["Berhampore","Baharampur","Jiaganj","Lalbagh","Raghunathganj","Jangipur"],
      "Nadia": ["Krishnanagar","Kalyani","Ranaghat","Nabadwip","Chapra","Santipur"],
      "Bardhaman": ["Burdwan","Asansol","Durgapur","Kalna","Katwa","Galsi"],
      "Birbhum": ["Suri","Bolpur","Rampurhat","Nalhati","Md. Bazar","Ilambazar"],
      "Bankura": ["Bankura","Bishnupur","Barjora","Khatra","Indpur","Sarenga"],
      "Malda": ["Malda","English Bazar","Old Malda","Gazole","Harishchandrapur"],
      "Jalpaiguri": ["Jalpaiguri","Siliguri","Alipurduar","Dhupguri","Matiali","Mal"],
      "Darjeeling": ["Darjeeling","Siliguri","Kurseong","Kalimpong","Mirik","Phansidewa"],
      "Cooch Behar": ["Cooch Behar","Dinhata","Tufanganj","Mathabhanga","Mekhligunj"],
    }
  },

  // Union Territories
  "Delhi": {
    districts: {
      "Central Delhi": ["Paharganj","Karol Bagh","Connaught Place","Daryaganj","Chandni Chowk"],
      "North Delhi": ["Model Town","Mukherjee Nagar","Burari","Alipur","Bawana"],
      "South Delhi": ["Saket","Hauz Khas","Defence Colony","Malviya Nagar","Mehrauli"],
      "East Delhi": ["Preet Vihar","Mayur Vihar","Anand Vihar","Shahdara","Seelampur"],
      "West Delhi": ["Janakpuri","Uttam Nagar","Dwarka","Vikaspuri","Tilak Nagar"],
      "North West Delhi": ["Rohini","Shalimar Bagh","Pitampura","Paschim Vihar","Mangolpuri"],
      "South West Delhi": ["Najafgarh","Kapashera","Palam","Bijwasan","Matiala"],
      "North East Delhi": ["Seelampur","Mustafabad","Karawal Nagar","Jaffrabad","Yamuna Vihar"],
    }
  },
  "Jammu & Kashmir": {
    districts: {
      "Srinagar": ["Srinagar","Budgam","Ganderbal","Beerwah","Chadoora","Khonmoh"],
      "Jammu": ["Jammu","Nagrota","Bishnah","Akhnoor","Marh","Samba","Suchetgarh"],
      "Anantnag": ["Anantnag","Pahalgam","Bijbehara","Dooru","Kokernag","Shangus"],
      "Baramulla": ["Baramulla","Sopore","Pattan","Tangmarg","Uri","Kunzer"],
      "Pulwama": ["Pulwama","Shopian","Pampore","Tral","Awantipora","Kakapora"],
      "Kupwara": ["Kupwara","Handwara","Karnah","Lolab","Langate"],
      "Rajouri": ["Rajouri","Nowshera","Sunderbani","Kalakote","Manjakote"],
      "Doda": ["Doda","Bhaderwah","Kishtwar","Thathri","Gandoh"],
    }
  },
  "Ladakh": {
    districts: {
      "Leh": ["Leh","Nubra","Zanskar","Khaltse","Nyoma","Durbuk","Hanle"],
      "Kargil": ["Kargil","Zanskar","Drass","Sankoo","Padum","Shargol"],
    }
  },
  "Andaman & Nicobar": {
    districts: {
      "South Andaman": ["Port Blair","Aberdeen Bazar","Prothrapur","Garacharma","Minnie Bay"],
      "North & Middle Andaman": ["Diglipur","Rangat","Mayabunder","Betapur"],
      "Nicobar": ["Car Nicobar","Great Nicobar","Nancowry","Katchal"],
    }
  },
  "Chandigarh": {
    districts: {
      "Chandigarh": ["Sector 1-10","Sector 11-20","Mohali","Panchkula","Manimajra","Maloya","Hallomajra"],
    }
  },
  "Dadra & Nagar Haveli and Daman & Diu": {
    districts: {
      "Dadra & Nagar Haveli": ["Silvassa","Naroli","Khanvel","Amli","Rakholi"],
      "Daman": ["Daman","Nani Daman","Moti Daman","Kadaiya","Ringanwada"],
      "Diu": ["Diu","Fudam","Ghoghla","Vanakbara"],
    }
  },
  "Lakshadweep": {
    districts: {
      "Lakshadweep": ["Kavaratti","Agatti","Minicoy","Amini","Andrott","Kalpeni"],
    }
  },
  "Puducherry": {
    districts: {
      "Puducherry": ["Puducherry","Mahe","Villianur","Ariyankuppam","Mannadipet","Nettapakkam"],
      "Karaikal": ["Karaikal","Tirunallar","Nedungadu"],
      "Mahe": ["Mahe"],
      "Yanam": ["Yanam"],
    }
  },
};
