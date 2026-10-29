// Turkish overrides for content.mjs. Anything not listed here falls back to the English text.
// Work and posts are matched by slug, experience and timeline by position, repos by name.

export default {
  person: {
    role: "Yazılım mühendisi",
    focus: "Makine öğrenmesi ve biyoinformatik",
    location: "Elazığ, Türkiye",
    bio: "Küçük yaşlardan beri bilgisayarlara olan ilgim sayesinde hep bilgisayarlarla iç içe bir hayat yaşadım ve hayatımın geri kalanında da böyle olacak.",
  },

  work: {
    oncomind: {
      kicker: "Biyoinformatik, ilaç keşfi",
      summary: "Lösemi için açık kaynaklı, yapay zekâ destekli bir ilaç keşfi ve biyoinformatik araştırma platformu.",
      role: "Proje kurucusu, YZ/ML araştırması",
      period: "Eki 2025 — devam ediyor",
      org: "Açık kaynak proje",
      readouts: [
        ["32.437", "57.619 ham kayıttan temizlenen bileşik"],
        ["%95 / %90", "geçerli molekül, LSTM / Graph-VAE"],
        ["−%10", "LSTM hattına göre BBB toksisitesi"],
      ],
      bullets: [
        "6 kinaz inhibitörüne ait bir veri setini düzenleyip ön işledim; 57.619 ham moleküler kaydı, üretken model eğitimi için 32.437 kanonik ve tekilleştirilmiş bileşiğe indirdim.",
        "De novo ilaç adayı üretimi (SMILES) için iki üretken mimariyi eğitip karşılaştırdım: bir LSTM ve bir Graph-VAE modeli. Kimyasal olarak geçerli bileşik üretiminde sırasıyla %95 ve %90 doğruluk elde ettim.",
        "LSTM ile üretilen adayların %90'ında BBB toksisitesi olduğunu tespit ettim; hattı Graph-VAE mimarisiyle yeniden kurarak BBB toksisitesini %10 azalttım ve hedefe yönelik tedavi için adayların güvenlik profilini iyileştirdim.",
        "Veri alımından aday üretimine kadar uçtan uca süreci destekleyen tam yığın bir ilaç keşfi platformu tasarladım (Python/FastAPI backend, C#/.NET servis katmanı, React frontend, MongoDB).",
      ],
      story: {
        challenge: "Asıl zorluk araştırma kısmıydı: lösemiyi tedavi edebilecek gelecekteki aday bileşikler için doğru genomları seçmek. Ama daha önemli kısım optimizasyon ve veri toplamaydı. Genomik veri toplamak, bir e-ticaret sitesinden metin çekmek kadar kolay değil. Veriyi çekmek zor değil; zor olan, büyük bir LSTM modelini eğitmeden önce onu temiz şekilde ayıklamak ve bileşiklerden emin olmak.",
        goal: "Hedef çok geniş: araştırmacılar ve doktorlar için dijital bir ilaç keşfi ve biyoinformatik laboratuvarı geliştirmek. Sistemi optimize, kullanımı kolay ve bir resmi belge kadar açık olacak şekilde tasarladım. Biyobilim ya da biyoinformatik alanında yeterli bilgisi olan herkes uygulamayı rahatça kullanabilmeli. Ama çok açık ve kullanışlı bir arayüz geliştirmeme rağmen daha fazlasına ihtiyacım vardı, bu yüzden Farkındalık Rehberi'ni yazdım.",
        result: "Proje hâlâ devam ediyor ve bu on yılda bitmeyecek. Belki bir sonrakinde :)",
      },
      links: ["Depo"],
    },
    "alcin-uav": {
      title: "Alçın İHA Takımı",
      kicker: "Bilgisayarlı görü, İHA sistemleri",
      summary: "Teknofest Savaşan İHA yarışması için sıfırdan geliştirilmiş, yapay zekâ entegre otonom bir İHA.",
      role: "Bilgisayarlı görü ve İHA sistemleri mühendisi",
      period: "Oca 2023 — Haz 2024",
      imageAlt: "Uçuştaki bir İHA'ya kilitlenen takip arayüzü; tespit kutusu ve güven etiketi",
      readouts: [
        ["30 FPS", "kart üzerinde kararlı çıkarım"],
        ["%97", "tespit doğruluğu"],
        ["60 sn", "hedef kilidi, kararlı uçuşta"],
      ],
      bullets: [
        "Özel bir YOLOv8 modelini NVIDIA Jetson Xavier NX üzerinde optimize edip çalıştırdım; gerçek zamanlı İHA takibinde %97 tespit doğruluğuyla kararlı 30 FPS çıkarım elde ettim.",
        "Kararlı uçuş koşullarında 60 saniye, türbülanslı koşullarda 25 saniye kesintisiz hedef kilidi sağlayarak takibin değişken aerodinamik bozulmalar altındaki dayanıklılığını doğruladım.",
        "Uçuş kontrol algoritmaları ve gerçek zamanlı aviyonik takibi için Qt Quick ile bir Yer Kontrol İstasyonu (YKİ) tasarlayıp geliştirdim.",
      ],
      story: {
        challenge: "Yarışmanın şartı, it dalaşı yapabilen yapay zekâ entegre otonom bir İHA üretmekti.",
        goal: "Hedefimiz bir İHA üretmekti, ama benim payıma düşen yapay zekâ entegrasyonu ve yer istasyonu geliştirmeydi. Projeye takımdaki arkadaşlarımdan çok daha önce başladım, çünkü bu kısım işin en önemli ve en zorlu parçasıydı.",
        result: "Takımımız silahlı bir İHA'yı tamamen sıfırdan geliştirdi ve bu zorlu bir işti. Benim işim daha da zorluydu; en az 150 bin görüntü içeren bir model eğitmem gerekiyordu ve Google Colab ile Kaggle'da eğitim çok yavaş ilerliyordu. Bu yüzden tüm modelleri yerelde eğitmeye karar verdim, ama önce iyi bir donanıma ve bilgisayarlı görü için kusursuz ortam ayarlarına ihtiyacım vardı. Bir süre modelleri ve it dalaşı algoritmasını yarışma tarihine yetiştiremeyeceğimi düşündüm. Ama sonunda bu macera bana bir şey öğretti: zaman kısıtlı olsa bile tutkunu kaybetmezsen işlerini geliştirmenin bir yolunu her zaman bulursun. İstediğin kadar mükemmel olmayabilir, ama yine de başarabilirsin.",
      },
      links: ["Takip arayüzü", "Yarışma"],
    },
    "capella-rocket": {
      title: "Capella Model Roket Takımı",
      kicker: "Aviyonik, gömülü sistemler",
      summary: "Teknofest için yapılan bir sondaj roketinin uçuş bilgisayarı telemetrisi ve yer istasyonu.",
      role: "Takım lideri, aviyonik ve gömülü sistemler sorumlusu",
      period: "Kas 2022 — Haz 2024",
      imageAlt: "Capella takımının sondaj roketi, sergi standında",
      readouts: [
        ["78 B", "tam veri bütünlüğüyle telemetri paketi"],
        ["~%30 → %5–8", "telemetri veri kaybı"],
      ],
      bullets: [
        "Yarışmanın zorunlu tuttuğu telemetri sistemini STM32F103C8T6 (LQFP48) uçuş bilgisayarında programladım; hakem arayüzünün bant genişliği şartını karşılamak için sensör veri paketlerini, telemetri bütünlüğünü koruyarak 78 bayta sıkıştırdım.",
        "Sensör füzyonu için bir Kalman filtresi uyguladım; uçuş koşullarında telemetri veri kaybını ~%30'dan %5–8'e düşürerek yer istasyonu takibinin güvenilirliğini önemli ölçüde artırdım.",
        "Gerçek zamanlı uçuş verilerini görselleştirmek için C# Windows Forms ile bir Yer Kontrol İstasyonu (YKİ) arayüzü tasarlayıp geliştirdim.",
      ],
      links: ["Yarışma"],
    },
    budgettravel: {
      kicker: "LLM ajanları, tam yığın",
      summary: "Doğal dilde yazılan istekleri kişiselleştirilmiş, rotası optimize edilmiş gezi planlarına dönüştüren bir yapay zekâ seyahat planlayıcısı.",
      role: "Scrum master ve yapay zekâ mühendisi",
      period: "Şub 2025 — Haz 2025",
      org: "4 kişilik bitirme projesi takımı, uzaktan",
      readouts: [
        ["~10 → 2–5 dk", "gezi planı oluşturma süresi"],
        ["4", "kişi, iki iş kolu"],
      ],
      bullets: [
        "Ajanın arka plan inceleme ve harita gezinme hattını optimize edip OpenAI ve Google Maps API'lerini gerçek zamanlı rota optimizasyonu için entegre ederek yapay zekâ ile gezi planı oluşturma süresini ~10 dakikadan 2–5 dakikaya indirdim.",
        "4 kişilik bitirme projesi takımında Scrum Master olarak sprint planlamasını ve görev dağılımını yönettim; yapay zekâ backend'i ile web frontend iş kolları arasında tam yığın geliştirmeyi koordine ettim.",
        "Kullanıcıların doğal dil girdisinden kişiselleştirilmiş, optimize gezi planları oluşturabildiği, yapay zekâ destekli tam yığın bir seyahat planlama platformu tasarladım.",
      ],
      links: ["Canlı site", "Depo"],
    },
    "smart-board": {
      title: "Akıllı Tahta",
      summary: "Öğretmenlerin e-postayla gelen tek kullanımlık şifrelerle açtığı bir akıllı tahta kilit ekranı.",
      role: "Geliştirici",
      period: "2 hafta",
      story: {
        challenge: "Müşterinin sorunu, eski kilit yazılımının yeni Windows işletim sistemlerinde çok yavaş çalışmasıydı. Akıllı tahtaya yalnızca öğretmenlerin, Yandex Mail tabanlı tek kullanımlık şifrelerle girebilmesi için bir mail sunucusu kullanan yeni bir kilit yazılımı yazmamız gerekiyordu.",
        goal: "Hedefimiz hızlı, uyumlu ve iyi bir kullanıcı deneyimi sunan verimli bir servis kurmaktı. Kullanımı kolay olmalıydı ve backend servisleri öğretmenlerin ders saatini boşa harcatmayacak kadar verimli çalışmalıydı.",
        result: "Sonunda, öğretmenlerin akıllı tahta kilit ekranını kendi şifreleriyle açabilmesini sağlayan e-posta servis modülünü geliştirdik.",
      },
    },
  },

  experience: [
    {
      role: "Junior yazılım geliştirici",
      place: "Kayseri, Türkiye",
      period: "Haz 2023 — Eyl 2023",
      bullets: [
        "Bir çelik üretim tesisi için altı makine tipini kapsayan, Gantt şeması tabanlı bir üretim planlama sistemini ortak geliştirdim ve Node.js ile şirketin mevcut .NET altyapısına entegre ettim.",
        "Sistemi, makine operasyonlarını tek tek işçi vardiyalarının senkronizasyonuna kadar planlayacak şekilde kurdum; bu, şirketin önceki manuel sürecine göre çok daha hassas bir üretim planlaması sağladı.",
        "Finans ekibinin tahminlerine göre araç, yıllık tahmini 1–4 milyon dolar maliyet tasarrufuna katkı sağladı ve üretim planlama sürelerini en az bir ay kısalttı.",
        "Özel arayüz bileşenleri için DevExtreme kullandım; verileri FirebirdSQL ve MSSQL veritabanlarında yönettim.",
      ],
    },
  ],

  timeline: [
    { role: "Proje kurucusu" },
    { role: "Scrum master ve YZ mühendisi" },
    { role: "Junior yazılım geliştirici" },
    { role: "Bilgisayarlı görü ve İHA sistemleri mühendisi", org: "Alçın İHA Takımı" },
    { role: "Takım lideri, aviyonik", org: "Capella Model Roket Takımı" },
  ],

  repos: {
    "labox": "Tıbbi cihazlar arasındaki iletişimi kolaylaştıran bir platform.",
    "LLMHallucinations": "Büyük dil modelleri için çok disiplinli halüsinasyon tespiti ve otomatik değerlendirme aracı.",
    "research-agent": "Ajanların, LangGraph'in ve TensorFlow'un temellerini pratik etmek için bir araştırma ajanı.",
    "PySide6PersonalHubApplication": "Oyunlar, müzik, filmler ve diziler için kendi PySide6 masaüstü merkezim.",
    "ImageCaptioningPySide6": "Açık kaynak görüntü altyazılama modelleriyle görselleri yorumlayıp bu yorumları seslendiren bir PySide6 arayüzü.",
    "Machine-Learning-Libraries-and-Algorithms": "Makine öğrenmesi kütüphaneleri ve algoritmaları.",
    "LeetCodeProblems": "LeetCode'daki en önemli 150 mülakat sorusundan 56'sı, benim çözümlerimle.",
    "uav-tracking-interface": "Uzak mesafelerde bile doğruluğunu koruyacak şekilde geliştirilmiş İHA tespit yazılımı.",
    "autonomous-car": "Python ile yapılmış otonom bir araba.",
  },

  education: {
    school: "Fırat Üniversitesi",
    degree: "Yazılım Mühendisliği, lisans",
    period: "Beklenen mezuniyet: Haz 2028",
    courses: ["Veri yapıları ve algoritmalar", "Lineer cebir", "Olasılık ve istatistik", "Ayrık matematik", "Veri bilimi", "Sayısal analiz"],
  },
  skills: ["Python", "C++", "JavaScript", "Node.js", "PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "pandas", "RDKit", "Docker", "Takım liderliği"],
  languages: ["Türkçe (ana dil)", "İngilizce (orta / ileri)"],
  interests: ["Film yapımı", "Oyun yapımı", "Müzik besteleme", "Grafik tasarım"],

  currently: [
    { note: "Tıbbi cihazlar arasındaki iletişimi kolaylaştıran bir platform." },
    { value: "Yazılım Mühendisliği, Fırat Üniversitesi" },
  ],

  favorites: [
    { kind: "Dizi", note: "Birinin farklı bir şeyi anlatma konusunda bu kadar cesur, bu kadar gerçekçi olup yine de bir şekilde izletebileceğini hiç düşünmemiştim." },
    { kind: "Dizi", note: "Komedi." },
    { kind: "Film", note: "Sonu hem inananlara hem inanmayanlara harika bir cevap. Gerçekten şunu soruyor: sadece bilime mi, sadece dine mi ihtiyacın var, yoksa ikisi bir aradayken mi daha iyi?" },
    { title: "The Matrix ve Gladyatör", kind: "Filmler", note: "Çocukken izlediğim ilk filmler; bu yüzden kalbimde özel bir yerleri var." },
    { kind: "Film", note: "Bana ilham verdi ama Jobs'un gerçek yüzünü de gösterdi. Filmden hem ilham alarak hem de Jobs'un çocukken sandığımız kadar saf biri olmadığını bilerek çıktım." },
  ],

  posts: {
    "lstm-or-graph-vae": {
      title: "LSTM mi, Graph-VAE mi? Molekül Üretiminde Alışılmış Seçimi Test Etmek",
      dek: "Standart SMILES LSTM'ini neden bir graf modeliyle karşılaştırdım ve hangisi nerede kazandı.",
      category: "Makine öğrenmesi",
      body: [
        ["p", "OncoMind için ilaç adayları üretmeye başladığımda bulduğum örneklerin neredeyse hepsi aynı modeli kullanıyordu: molekülleri SMILES dizileri olarak, karakter karakter yazan bir LSTM. Bunun neden standart hâline geldiğini ve ihtiyacım olan şey için farklı bir mimarinin daha iyisini yapıp yapamayacağını merak edip durdum."],
        ["h2", "Soru"],
        ["p", "SMILES dizisi, bir molekülü tek satırlık metin olarak yazmanın bir yolu. LSTM bu metnin gramerini öğrenir ve bu gramere uyan yeni diziler yazar. Graph-VAE ise farklı çalışır: molekülü atomların düğüm, bağların kenar olduğu bir graf olarak ele alır ve yeni graflar örnekleyebileceği bir uzay öğrenir."],
        ["p", "Sorum basitti: model, molekülü bir metin satırı yerine yapısıyla görürse daha iyi adaylar üretir mi?"],
        ["h2", "Kurulum"],
        ["p", "İki modeli de aynı veriyle eğittim: 6 kinaz inhibitörüyle ilişkili bileşikler. Ham veride 57.619 kayıt vardı. Kanonikleştirme ve tekrarları temizleme sonrasında eğitim için 32.437 bileşik kaldı. Temizlik, eğitimden daha çok emek istedi. Verideki küçük bir hata, ileride binlerce kötü moleküle dönüşüyor."],
        ["p", "Sonra her modelin ürettiği molekülleri dört açıdan karşılaştırdım:"],
        ["ul", [
          "Geçerlilik: çıktının gerçek, kimyasal olarak geçerli bir molekül olup olmadığı.",
          "Sentetik erişilebilirlik: molekülün laboratuvarda üretilmesinin ne kadar zor olacağı.",
          "Benzersizlik: üretilen moleküllerin ne kadarının birbirinden farklı olduğu.",
          "BBB geçirgenliği: molekülün kan–beyin bariyerini geçme ihtimali; bu adaylar için bunu bir toksisite riski olarak ele aldım.",
        ]],
        ["h2", "Ne oldu"],
        ["p", "LSTM geçerlilik ve sentetik erişilebilirlikte kazandı. Yazdıklarının daha büyük kısmı geçerliydi ve moleküllerini üretmek daha kolaydı."],
        ["p", "Graph-VAE ikisinde de daha kötüydü. Ama en çok önemsediğim iki sonuçta açıkça daha iyiydi: çok daha fazla benzersiz molekül üretti ve adaylarının daha azının kan–beyin bariyerini geçeceği tahmin edildi. LSTM'in adaylarının çoğu BBB geçirgenliği nedeniyle işaretlendi."],
        ["h2", "Bence LSTM neden standart"],
        ["p", "Bu, deneyden sonraki tahminim; kanıtlanmış bir kural değil. LSTM, eğitim verisindeki kalıpları takip etmekte çok iyi. Bu da geçerli ve sentezlemesi kolay moleküller veriyor; birçok karşılaştırmanın ödüllendirdiği şey de tam olarak bu. Ama aynı alışkanlık, çıktılarını hem birbirine hem de eğitim setine benzetiyor; kaçınmak isteyebileceğin özellikler de buna dahil. Graf modeli daha çok keşfediyor ve bunun bedelini daha sık geçersiz ya da üretmesi daha zor moleküllerle ödüyor."],
        ["h2", "Bundan çıkardıklarım"],
        ["p", "Tek bir kazanan yoktu. Hangi modelin “daha doğru” olduğu, neyi ölçtüğüne bağlı. OncoMind'da hattı Graph-VAE'ye taşıdım, çünkü bu aşamada yeni ve daha güvenli adaylar benim için kolay olanlardan daha önemli. Geçersiz bir molekülü atmak kolay; kan–beyin bariyerini geçen geçerli bir molekül ise daha zor bir sorun."],
        ["p", "LSTM'in yanlış bir seçim olduğunu düşünmüyorum. Güçlü bir temel model ve bu karşılaştırma, ancak onunla kıyaslayabildiğim için bir anlam taşıdı."],
        ["p", "Molekül üretimi üzerine çalıştıysan ve gözden kaçırdığım bir şey olduğunu düşünüyorsan, duymak isterim."],
      ],
    },
    "interuniverse-fungal-civilization": {
      title: "Evrenlerarası Mantar Medeniyeti",
      dek: "Uzaylılar üzerine küçük bir beyin fırtınası.",
      category: "Bilim kurgu",
      body: [
        ["p", "Hiç uzaylıları ya da bizden çok uzaktaki başka bir yaşam formunu düşündünüz mü? Çok farklı, tuhaf, çirkin, güzel, güçlü, zayıf, bireysel ya da kolektif bir zihin olabilirler. Kolektif zihin hikâyelerini çok duyduk, peki ya filmlerden biraz daha fazla bilime bağlı kalarak gerçek şeyler hayal etsek: kısıtlı kelime dağarcığımızla tarif etmesi imkânsız bir mantar medeniyeti. Ama deneyeceğim."],
        ["h2", "Gerçekliğinizin Ötesindeki Yaşam Formları"],
        ["p", "Dış dünyadaki yaşam korkutucu görünüyor ama merakımızı da alevlendiriyor; onları bulmayı umuyoruz ama uzaylılar hakkında komplo teorileri kurmaktan da çekinmiyoruz: sürüngenler, They Live, Secret Invasion."],
        ["h3", "Kardaşev ölçeği"],
        ["p", "“Kardaşev ölçeği, bir medeniyetin teknolojik ilerleme düzeyini, yararlanabildiği ve kullanabildiği enerji miktarına göre ölçen bir yöntemdir.” Ama biz farklı düşüneceğiz: ya bu enerji kullanımının tamamı ulaşımla, ne kadar hızlı seyahat edebildiğinle ilgiliyse? Işık hızı mı? Yanlış cevap. Cevap IŞINLANMA: gezegenleri, galaksileri, hatta evrenleri işgal etmek, onlara hükmetmek ve her başarılı işgalden sonra daha iyi evrimleşmek için evrenlerarası ulaşımı kullanan bir mantar medeniyeti. Devasa, meteorik zekâların engin bilgisi; gezegenleri sporlarıyla yönetip birbirine bağlıyor ve kolektif zihinlerinin sınırlarını, bildiğimiz tek şeye yaklaşmak için genişletiyor: mutlak sonsuz, ebedi bir varoluş gücü."],
        ["h2", "Sonuç"],
        ["p", "Sadece simbiyotları düşünmeyin, farklı düşünün: evrenlerin içinde ve ötesinde renkler, teknolojiler, bilgiler olabilir. Kendinin farkında olan tek tuhaf canlı biz olabiliriz; belki en zayıf ve en vahşi olanı. Ama uzaylıları bulsak bile kimsenin kaçamayacağı kaçınılmaz bir gerçek var. Ve en acı veren fikir şu: ya başka bir canlı da bizimki gibi bir hayat hayal ediyorsa? Belki bir gün hayal ettiğimiz uzaylılara biz dönüşeceğiz, ama o gün sevmek, hatırlamak, tapınmak için geriye ne kalacak? Ya da kendine hâlâ insan diyecek olanlar."],
      ],
    },
    "the-matrix-virus-of-this-era": {
      title: "Bu Çağın Matrix Virüsü",
      dek: "Matrix toplumumuza nasıl zarar verdi.",
      category: "Bilim kurgu",
      body: [
        ["h2", "Matrix Nedir"],
        ["p", "Bugünün dijital çağında Matrix'ten kaçmak paraya dönüştürülmüş durumda ve bu bir para basma makinesi. İnsanlar sistemin dışında olduklarını düşünüyor ama aslında onu besleyenler kendileri. Kehanet bir yalan: milyarder ol, milyoner ol, zengin ol, varlıklı ol, evrendeki en güçlü varlık ol. Bunu nasıl yapacağını mı merak ediyorsun? Matrix'ten kaçmalısın; Matrix'ten kaçmak için de benim 30 dolarlık Udemy kursumu satın almalısın. Buna kendini gerçekleştiren kehanet diyoruz."],
        ["h2", "Popüler Kültür Kaynaklı Yozlaşma"],
        ["p", "Gençlerin birçoğu (özellikle erkekler), internetin en başarılı “girişimcileri” tarafından sağmal inek olarak görülüyor. Kolayca yönlendirilebiliyorlar, özel olduklarını ve geri kalan herkesin aptal ya da “NPC” olduğunu düşünebiliyorlar; bu insanlar da Matrix'i, haksız eylemlerini meşrulaştırmak için bir metafor olarak kullanıyor. Bir zamanlar teknolojinin tehlikelerini, özgürlüğün ve insan hayatının değerini anlatmak için kullanılan Matrix filmi, artık algoritmaların nefret ve narsisizm yaymak için kullandığı bir araç."],
        ["h2", "Verilen Zarar"],
        ["p", "Bir adam akranlarını insan olarak görmüyorsa, istediği her şeyi yapabilir; günün sonunda o Matrix'in içindedir ve geri kalan herkes gözden çıkarılabilir NPC'lerdir. Okul saldırıları, kadınlara yönelik nefret, başka ırklara yönelik nefret. Sen özel değilsin, Matrix'in içinde değilsin ve ırkın üstün değil. Bu kadar çok gencin böyle davranmasının nedeni tek bir parametreyle açıklanamaz; oyunlar, diziler ya da algoritmalar, bu gençleri çıldırtan bir tüketimin parçaları, sadece biri değil. Aşırı maruz kalıyoruz ve gerçeği göremiyoruz. “Beyin sisi olabilir”, “ezikler”, “babasızlar”, “incel”: bunlar, bir genç haksız bir eylemde bulunduğunda insanların yaptığı suçlamalar. Ama aileleri, öğretmenleri, kişinin kendisini, sosyal medyayı, etnik kökenini ya da dış görünüşünü suçlamak sorunu çözmez; yarayı derinleştirir. İnternete de yüz yüze iletişime de ihtiyacımız var. Bazı insanların bu “olaylara” karışanlara kitap okumak gibi şeyler önerdiğinin farkındayım. Bir yalnızlaşma sorunu, daha fazla yalnızlaşmaya yol açabilecek başka bir alışkanlıkla çözülemez. Bunun yerine onları eğitmeli; bunu neden yaptıklarını, neden utangaç olduklarını, neden zorbalığa uğradıklarını ya da arkadaş edinmekte neden zorlandıklarını, iyi bir aileleri olup olmadığını anlamalıyız. Bunların hiçbiri sorunun kendisi değilse, o zaman…"],
        ["h2", "Sonuç"],
        ["p", "Ders şu: bir insan ne kadar sanallaşırsa, o kadar yalnız ve tehlikeli hâle gelir. İnsanlarımızı sanal hayat hakkında eğitmeli, internette aşırı maruz kaldıkları videoların ya da şeylerin gerçekliğin tamamı olmadığını onlara hatırlatmalıyız. Diziler, filmler ve kurgusal karakterler yaratıldıkları gibi kalmalı. Tükettiğimiz şeyin tüketilen olduğunu unutmamalıyız; o bizi tüketmeye başlamamalı."],
      ],
    },
  },
};
