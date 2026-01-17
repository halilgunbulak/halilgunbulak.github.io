const MISSIONS_TR = [
    { "header": "DENEME METİN", "body": "Hiper atlama hesaplandı. Hedef bilinmiyor. Yolunuz açık olsun komutan." },
    { "header": "Metin 1 (suç toplumda ) ", "body": "suç toplumda oluşan düzenin devamını sağlamak ve temel haklar ile özgürlüklerin korunabilmesi için gereken hukuki değerlerin ihlal edilmesi şeklinde haksızlık oluşturan insan davranışlarıdır bu davranışlar ceza hukuku yaptırımlarına tabi tutulan ve kanunun karşılığında ceza yaptırımı öngördüğü fiillerdir suç teşkil eden fiil bir hakkı ihlal ettiği için haksızlık teşkil eder dolayısıyla her suç aynı zamanda haksızlık teşkil etmektedir ancak her haksızlık suç değildir suç içeriği bakımından kanun koyucunun inancına göre devletin amaçlarıyla çatıştığından yaptırım olarak ceza veya güvenlik tedbirlerini gerektiren fiil kapsamındadır bir fiilin suç olup olmadığını belirlemek kanun koyucuya aittir suçla ilgili temel kavramlar şunlardır fail cezai nitelikteki hukuka aykırı fiili işleyen kişidir yaralama hırsızlık ve dolandırıcılık suçlarında olduğu gibi suçların çoğunluğu herhangi bir kimse tarafından işlenebilir bunlara genel suçlar denir bazı suçlarsa sadece belli hukuki veya fiili durumdaki kişiler tarafından işlenebilir bunlara ise mahsus suçlar denir her suçun faili olduğu gibi mutlaka hukuki konusu bulunmaktadır örneğin hırsızlık suçunun hukuki konusu zilyetlik yaralama suçunun hukuki konusu vücut bütünlüğü insan öldürme suçunun hukuki konusu yaşam hakkının ihlalleridir suçun maddi konularına bakacak olursak yalnızca maddi varlığı bulunan varlıklar üzerinde suç işlenebilir insan suçun maddi konusu olabilir tüzel kişiler topluluklar ve cismani varlığı olmayan şeyler suçun maddi konusunu oluşturamazlar örneğin hırsızlık suçunun maddi konusunu çalınan eşya oluştururken kasten öldürme suçunun maddi konusunu insan oluşturmaktadır mağdur insan toplum devlet ve tüzel kişiler olabilmektedir her suçun mutlaka mağduru vardır suçun mağdurları suç işlenirken hayatta olan kişilerdir kimse kendi kendisine karşı suç işleyemez örneğin intihar suç değildir ancak şikayete bağlı suçlarda şikayet hakkı kullanımı suçun mağduruna tanınmıştır suç devlete toplumun varlığına ve gelişimine ilişkin menfaatlerinin ihlalinden kaynaklanan sosyal zarar yanında doğrudan olarak zarar da doğurur bu zararlar her suçta mutlaka bulunmaktadır ihlal zarar verme şeklinde ya da tehlikeye düşürme şeklinde kendini göstermektedir suç işlenmesi nedeniyle mağdur olan kişi ile suçtan zarar gören kişi birbirinden farklılık göstermektedir" },
    { "header": "Metin 2 (genel olarak kanunlarda )", "body": "genel olarak kanunlarda suç olarak tanımlanan eylemleri işleyen kişilere verilen yaptırımlara ceza denir\n" +
            "cezalar keyfi olmamalıdır hakkaniyete uygun insani herkese eşit olacak şekilde uygulanmalıdır verilen\n" +
            "cezalarda toplum yararı gözetilmelidir genel olarak cezalar hapis cezası para cezası vücuda zarar verme\n" +
            "hayata son verme veya fail tarafından bir şeyin yapılması şeklinde olabilir türk ceza kanununda bedensel\n" +
            "veya hayata yönelik cezalar bulunmaz türk hukuk sisteminde işlenen suçların karşılığı olarak hapis cezaları\n" +
            "veya adli para cezaları öngörülür türk hukuk sistemindeki cezaların temel özellikleri arasında cezaların\n" +
            "şahsiliği ilkesi bulunmaktadır buna göre kişiler başka birinin işlediği fiiller nedeniyle sorumlu tutulamaz\n" +
            "kanunilik ilkesi de cezaların başka bir özelliğidir ceza yasa koyucu tarafından kanunla konulup ancak\n" +
            "kanunla kaldırılabilir yasa koyucu neyin suç olup olmayacağı suçların karşılığı cezaların neler olacağı\n" +
            "konusunda takdir hakkına sahiptir ayrıca cezanın insan onuruyla bağdaşır nitelikte olması gerekir hiç kimse\n" +
            "insan onuru ile bağdaşmayan bir ceza veya muameleye tabi tutulamaz ayrıca fiili gerçekleştiren kişiye\n" +
            "verilen cezanın kişiye uydurulması gerekir buna cezanın bireyselleştirilmesi denir suç sayılan eylemler bazı\n" +
            "şartlar altında gerçekleştirilirse suç olarak ifade edilmeyebilir bazı durumlarda da suç sayılmakla birlikte\n" +
            "ceza indirimi yapılması ya da ceza verilmemesi sonucunu doğuran sebeplere hukuka uygunluk nedenleri\n" +
            "denir bu durumlarda işlenen fiiller suç olmayıp kişiye ceza verilmesi uygun değildir ayrıca güvenlik tedbiri\n" +
            "uygulanamaz bu kişiler hakkında dava açılmışsa beraat kararı verilir bazı hallerdeyse kişinin ceza\n" +
            "sorumluluğu ortadan kalkar işlenen fiil nedeniyle failin hangi şartlarda sorumlu tutulacağının tespitinde\n" +
            "kusur durumu önemlidir işlediği fiil ile ilgili kişideki irade gelişiminin şartları bu şartlara istinaden\n" +
            "gerçekleştirdiği eylem nedeniyle failin şahsen cezalandırılması gerekmediği kusur durumu ile ilgilidir\n" +
            "kanuni tanımda yer verilen suç failin kusur yeteneği olmasa bile işlenmiş olursa haksız bir fiildir ve suç\n" +
            "niteliğini korur kanun koyucu faile bazı hallerde kusur yeteneği olmadığı için ceza verilmemesi gerektiğini\n" +
            "bazı hallerdeyse kusur yeteneğinin zayıf olduğu için nispeten daha hafif ceza verilmesi gerektiğini kayıt\n" +
            "altına almıştır" },
    { "header": "Metin 3 (failin gerçekleştirmiş)", "body": "failin gerçekleştirmiş olduğu fiille ortaya çıkan sonuç arasında manevi bağ bulunur bu manevi bağ kusur olarak ifade edilir failin cezalandırılması için bağın türünün tespit edilmesi önemlidir örneğin akıl hastalığı bulunan kişinin işlediği suç fiilinin farkında olmaması durumunda cezalandırılması mümkün değildir suçun manevi unsurları olarak ifade edilen kast ve taksir kavramları failin gerçekleştirdiği fiille arasındaki nedensellik bağını ifade etmektedir kast kusurlu iradenin tipik gerçek şeklidir suç kanunu emrinin açıkça ihlalidir emrin ihlali failin yasaklanan fiili istemesi durumunda gerçekleşir kastın varlığı için sadece hareketin değil sonucun da istenmesi gerekir türk ceza kanununa göre kast suçun var olduğunu söyleyebilmek için kastın varlığı gereklidir kast ise suçun kanuni tanımındaki unsurların bilerek ve istenerek gerçekleşmesini ifade eder kastın varlığı suçun bütün aşamalarında aranır ceza kanunlarını bilmiyor olmak elbette mazeret olarak sayılmaz tüm kanunların herkes tarafından bilinmesini beklemek söz konusu olamaz hukuku meslek edinen kişilerin bile bunları ezbere bilmeleri veya suç olduğunu tahmin etmeleri mümkün değildir bu gibi durumlarda gerçekleştirilen fiilin icrası sırasında suçun kanuni tanımında sayılan maddi unsurları bilmeyen bir kişinin kasten hareket ettiği söylenemez suçun kanuni tanımında sayılan unsurların tamamı bilinmese bile ahlaki yönden yanlış olduğu bilinen eylemin suç olacağı ihtimalini kişi tahmin edebilmelidir örneğin yaralama veya hileli davranışlarla dolandırma herkes tarafından bilinen ahlaken de yanlış kabul edilen davranışlardır bu durumda kimse suçun kanuni tanımında bulunan unsurları bilmediğini öne süremez doğrudan kast bilerek ve istenerek suçun kanuni tanımında yer alan fiilin işlenmesidir örneğin pastanede bir kimseye ateş ederek öldüren kişi doğrudan kastla hareket etmiş ise insan öldürme suçunu işlemiş olur dolaylı kast suçun kanunda tanımlanan fiilin gerçekleşmesinin mümkün veya muhtemelen öngörülmesine rağmen neticenin meydana gelmesinin göze alınması şeklinde bir düşünce ile fiilin işlenmesidir örneğin pastanede ateş eden fail oranın kalabalık olması sebebi ile öldürmek istediği kişi dışında başka kişilerin de zarar görme ihtimalini düşünmelidir ateş sonucu başka kişileri de yaraladığında yaralama suçundan da ceza alır" },
    { "header": "Metin 4 (taksir yasalarda öngörülen)", "body": "taksir yasalarda öngörülen dikkat ve özen yükümlülüğü ihlalinden kaynaklanan öngörülebilir bir suçun kasıtsız olarak işlenmesidir taksir ile işlenen fiiller sadece kanunda açıkça belirtilen hallerde başvurulan sorumluluk şeklidir taksirde kusur ağırlığı kasıtlı suçlara göre daha azdır fail çoğu zaman kendisi de bir mağduriyet yaşar özellikle trafik kazalarında bu durum sıklıkla yaşanır dikkatli ve tedbirli davranarak ortaya konulması gereken irade yerine dikkatsiz ve tedbirsiz davranarak başka bir irade ortaya konulur taksirli sorumluluktan söz edebilmek için mutlaka zararlı neticenin gerçekleşmesi gerekir taksirle işlenen suç neticesinde verilecek olan ceza failin kusur oranına göre değişir basit taksir öngörülebilir neticeyi failin öngörememesi sonucunda ortaya çıkar failin dikkatli ve özenli olması gerekirken bu yükümlülüğe aykırı hareketle suç fiilini işlemesidir basit taksir için bilinçsiz taksir adi taksir gibi ifadeler de kullanılmaktadır örneğin gerekli iş güvenliği önlemlerini almayan bir fabrikada işçi çalıştıran işveren iş kazası neticesinde yaralamaya sebebiyet verirse basit taksirle yaralama suçunu işlemiş olur birden fazla kişinin taksirle işlediği suçlarda herkes kendi kusurundan dolayı sorumlu olur her failin cezası kendi kusur oranlarına göre ayrı ayrı belirlenir bilinçli taksir failin öngörüsüne rağmen neticenin gerçekleşmesini istemeyip kural ihlali yapıp ya da şans kişisel yetenek gibi etkilere güvenerek hareket etmesiyle suç fiilini işlemesidir fail sonucun meydana gelebileceğini öngörmesine rağmen sonucun gerçekleşmeyeceği inancıyla hareket eder örneğin sollamanın yasak olduğu yolda bu yasağa uymayıp şoförlüğüne güvenerek sollama yapan ve ölüme sebebiyet veren kişiye bilinçli taksirle ölüme neden olma suçundan dolayı ceza verilir taksirli hareketle sebep olunan olayda failin kişisel ve ailevi durumu artık cezanın verilmesini anlamsız kılacak kadar mağdur olmasına neden olursa ceza verilmez taksirle işlenen suçlarda kanundaki tanımında kastın unsurlarından bilerek ve istenerek işlenmesi yer almaz taksirden bahsedebilmek için failin suç işlerken suç işlemek amacıyla hareket etmemiş olması gerekir kastla taksir arasındaki önemli ayrım isteme unsurudur kanunun fiilin taksirle işlenen şeklini doğrudan suç olarak kabul etmediği durumlarda taksirle işlenen fiilin suç olarak kabulü mümkün değildir" },
    { "header": "Metin 5 (kişi işlemeyi)", "body": "kişi işlemeyi kastettiği bir suçu elverişli hareketlerle doğrudan doğruya icrasına başlayıp elinde olmayan\n" +
            "nedenlerle tamamlamazsa teşebbüsten dolayı sorumlu olur suç genelde fiilin işlenmesi ve neticenin\n" +
            "meydana gelmesi ile sonuçlanır suçun tam olarak gerçekleşmediği durumlarda da suç genel tanımının\n" +
            "dışında kalır işlenen suç tamamlanmaz veya suç unsurlarının eksik olması nedeniyle suçun hukuk tanımına\n" +
            "uymaması durumunda suçun özel görünüş şekillerinden bahsetmek gerekir teşebbüs suçun özel görünüş\n" +
            "şekillerinden biridir suç yolunda ilerleyen fail çeşitli aşamalardan geçer suç yolunda icra ve tamamlama\n" +
            "aşaması olmak üzere iki aşama vardır kasıtlı işlenen suçlarda bahsedilen aşamalara düşünce aşaması da\n" +
            "eklenir bu aşama icra aşamasından önce gelir bazen de tamamlanma aşamasını son bulma aşaması takip\n" +
            "eder böylece suç yolunda dört aşama vardır denilebilir düşünce aşaması ceza hukukunu ilgilendirmez\n" +
            "eyleme dönüşmeyen hiçbir düşünce cezalandırılamaz icra aşamasına geçilmesiyle ceza hukukunun alanına\n" +
            "girilir düşüncenin somutlaştırılarak dış dünyada eyleme dönüşmesi her zaman o suçun icrasının başladığı\n" +
            "anlamına gelmez bu aşamada da hazırlık hareketleri icra hareketleri ayırımı yapılır hazırlık aşaması kural\n" +
            "olarak cezalandırılmaz ancak bazı istisna teşkil eden suçların hazırlık hareketleri cezalandırılabilir icra\n" +
            "aşamasında failin suç işleme düşüncesi icrai veya ihmali bir hareketle somutlaşır icra aşamasından sonra\n" +
            "tamamlama aşaması gelir tamamlanmış suç fail tarafından işlenen somut fiilin kanundaki soyut tanıma\n" +
            "uymasını ifade etmektedir fiil suç tanımına uygun bulunduğu anda suç tamamlanır teşebbüs aşamasında\n" +
            "kalmış suçu tam tamamlanmış suçtan ayıran nokta tamamlanma anının yokluğudur suçun tamamlanması\n" +
            "ile son bulması aynı olabileceği gibi bazen çakışmayabilir örneğin tokat atıldığında yaralama suçu oluşarak\n" +
            "tamamlanır birden fazla tokat atıldığında son tokadın atılmasıyla suç tamamlanmış olur aslında ilk tokadın\n" +
            "atılmasıyla suç zaten tamamlanmıştır bütün unsurları tamamlanmış suçla teşebbüs aşamasında kalmış suç\n" +
            "arasında manevi unsur yönünden fark yoktur her ikisi de suç sayılan belirli bir sonuca ulaşabilmek amacı\n" +
            "ile işlenir teşebbüste eksik failin iradesi dışında kalan nedenle bu sonuca götürecek hareketlerin bitmesi\n" +
            "veya biten hareketlerden hedeflenen sonucun oluşmasına engel olmasıdır" },
    { "header": "Metin 6 (failin suçun icra)", "body": "failin suçun icra eyleminden kendi isteğiyle vazgeçmesi ya da kendi çabası sonucu suçun tamamlanmasını\n" +
            "veya sonucun gerçekleşmesini önlemesi gönüllü vazgeçme şeklinde ifade edilir gönüllü vazgeçmede fail\n" +
            "suç yolunda sonuna kadar ilerleme imkanına sahipken kendi isteği ile devam etmek istemez gönüllü\n" +
            "vazgeçen kişi teşebbüsten dolayı cezalandırılmaz eylemin tamamlanmış olan kısmı eğer herhangi bir suç\n" +
            "oluşturursa bu durumda sadece o suça ait ceza ile cezalandırılır gönüllü vazgeçmede fail icra hareketlerine\n" +
            "devam edebilecek ve neticeyi gerçekleştirebilecek imkana sahiptir ancak bunu istememektedir neticeyi\n" +
            "gerçekleştirme ve devam etme isteğinin olmasına rağmen bu eylemi gerçekleştiremiyorsa gönüllü\n" +
            "vazgeçme yoktur saik önemli değildir mağdura duyduğu acıma cezadan korkma günah işleme düşüncesi\n" +
            "toplumsal dışlanma endişesi gibi nedenlerle vazgeçme olabilir vazgeçme failin özgür iradesi ile olmalıdır\n" +
            "dışarıdan gelen maddi veya manevi baskı altında vazgeçen kişi gönüllü vazgeçmiş olmaz failin iradesi\n" +
            "zorlanmış olmamalıdır örneğin failin hırsızlık yapmak için girdiği evde ev sahibine acıyarak ya da günah\n" +
            "işleme düşüncesi ile icra hareketlerini tamamlamaktan vazgeçtiği durumda bu vazgeçme gönüllü\n" +
            "gerçekleşmiştir sadece tamamlanan kısım suç oluşturuyorsa fail o kısımdan sorumlu olur verilen örnekte\n" +
            "fail sadece konut dokunulmazlığının ihlalinden sorumlu olur ancak güvenlik görevlisinin düdüğünü\n" +
            "duyduktan sonra pencereden atlayan failin vazgeçme eylemi gönüllü olmayıp fail hırsızlığa teşebbüs\n" +
            "suçundan dolayı cezalandırılır failin fiilini sona erdirmesine herhangi bir neden engel olacak şekilde sebep\n" +
            "olmuşsa ve bu nedenle fail amacına ulaşamayacağını anlayarak eyleme devam etmeyi bırakmışsa gönüllü\n" +
            "vazgeçme yoktur devam etme imkanı olmalı ve kendi iradesiyle kullanmaktan vazgeçmiş olmalıdır failin\n" +
            "pişman olurken samimi olması şart değildir ceza korkusu üçüncü kişilerin tavsiyesi veya acıma gibi\n" +
            "nedenler failin vazgeçme sebepleri arasındadır etkin pişmanlık kişinin işlemiş olduğu suçlardan dolayı\n" +
            "kendi isteğiyle sonradan pişman olması suç teşkil eden fiilin meydana getirdiği olumsuz sonuçları\n" +
            "gidermesi halinde uygulanan ceza hukuku kavramıdır suç oluştuktan sonra fail suç eyleminden kendi isteği\n" +
            "ile döner ise etkin pişmanlık cezayı ortadan kaldırabileceği gibi cezada indirim yapılabilmesini de sağlar" },
    { "header": "Metin 7 (haksız tahrik )", "body": "haksız tahrik failin kendi kusuru olmaksızın başkalarının haksız hareketleri sonucunda kapıldığı hiddet veya\n" +
            "elemin etkisiyle bir tepki suçu işleyerek hiddetle işlediği tepki suçunun cezasının bir miktar indirilmesidir\n" +
            "insan psikolojisinin buhran halini ifade eden haksız tahrik cezayı hafifleten genel kişisel ve kanuni bir\n" +
            "nedendir haksız tahrikin kişide oluşturduğu öfke ve şiddetli elem nedeniyle failin iradesinin özgürlüğünün\n" +
            "azaldığı ve mağdurun haksız hareketinin suça neden olduğu düşüncesiyle faile daha az ceza verilir cezanın\n" +
            "azaltılmasını gerektiren iki neden bulunur bunlar psikolojik nedenler ve haksız tahriktir psikolojide\n" +
            "heyecanın bir türü şeklinde nitelendirilen hiddet halidir bu durumda insanın iradesi zayıflayarak rahatlıkla\n" +
            "suç işleyebilir bu şekilde suç işleyen kişiler normal durumlarda suç işleyen kişilerden daha az tehlikelidir\n" +
            "haksız harekete uğrayan kişinin içine düştüğü bu psikolojik durum göz önünde bulundurulmalıdır çünkü\n" +
            "haksız harekete uğrayan kişi iradesi zayıfladığı için kolaylıkla suç işleyebilir objektif veya hukuksal\n" +
            "nedenlerin varlığında tahrik edilmesi nedeniyle suç işleyen kişi tek başına suç işlemiş sayılmaz tahrik eden\n" +
            "mağdurun da suçu vardır olayda yalnızca faili sorumlu tutmak haksızlık olur çünkü bu suçun işlenmesinde\n" +
            "mağdurun yaptığı hareket etkili olmuştur mağdurun kusurlu hareketleri failin cezasında indirim yapılmasını\n" +
            "gerektirir kendisine yöneltilen haksız hareketler sonucunda sakinliğini koruması gerekirken bunu\n" +
            "yapamayarak duygusal çöküntü yaşayan duyduğu üzüntü ve öfke nedeniyle suç işleyen failin bu\n" +
            "etkilenmesine hukuki değer vermek ceza adaletinin gereğidir hakim her olayın özelliğine göre hangi fiilin\n" +
            "tahrik edici fiil olduğunu tespit eder tahrik edildiğini söyleyen kişinin durumu olay yeri ve zamanı dikkate\n" +
            "alınarak belirlenir tahrik eylemi failin şahsına vücut bütünlüğüne hürriyetine yönelebilir hatta failin\n" +
            "yakınlarına sevip değer verdiği kimselere değer yargılarına malvarlıklarına veya faille herhangi bağı\n" +
            "olmayan üçüncü kişilere yönelik işlenebilir tahrike sebebiyet veren fiil haksız olmalıdır bir hareketin haksız\n" +
            "olması için hukukla çatışması yeterlidir hareketin ayrıca suç oluşturuyor olması gerekmez suçsa zaten\n" +
            "haksızdır hiddet şiddetli bir öfkenin hali olarak tanımlanmaktadır kanun hiddet ve elemi birbirine benzediği\n" +
            "için aynı nitelikte kabul eder" },
    { "header": "Metin 8 (kişinin kendisine)", "body": "kişinin kendisine veya başkasına ait bir hakka yönelik gerçekleşmesi ya da tekrarı muhakkak olan haksız\n" +
            "saldırıyı o andaki mevcut hal ve koşullara göre uzaklaştırmak amacıyla işlenen fiiller meşru savunmadır\n" +
            "zorunluluk kapsamında işlenen fiille yapılan saldırının arasında orantı olmalıdır bu zorunluluktan dolayı\n" +
            "fail cezalandırılmaz meşru savunma tüm ceza kanunlarında kabul edilen hukuka uygunluk nedenlerinden\n" +
            "biridir insanda bulunan kişinin kendini koruma içgüdüsüne dayanır haksız saldırıyla karşılaşan kişi\n" +
            "kendisini koruma amacıyla hareket eder hukuk düzeni saldırıya uğrayan kişinin menfaatini kanuna karşı\n" +
            "çıkan kişinin menfaatine tercih eder meşru savunma söz konusuysa suç olmadığından failin cezai\n" +
            "sorumluluğu bulunmaz bütünüyle sona ermiş saldırıda meşru savunma olmaz başlamamış ancak başlaması\n" +
            "muhakkak olan devam eden veya bitmiş olmasına rağmen tekrarı mümkün bulunan saldırı mevcut saldırı\n" +
            "sayılır ileride saldırıda bulunacaktı gibi düşünceyle saldırı yapmak meşru savunma değildir saldırı tamamen\n" +
            "bittikten sonra bir fiilin işlenmesi halinde de savunmadan bahsedemeyiz bu durumda şartları mevcutsa\n" +
            "haksız tahrik söz konusu olur saldırı mutlaka fiziki bir şiddet olarak anlaşılmamalıdır önemli olan\n" +
            "savunmayı zorunlu kılan tehlikelerin varlığıdır örneğin bir kişi kapı önünde durup insanların binaya\n" +
            "girmelerini engelliyorsa zorunluluk durumu vardır denir ancak sözlü saldırılar bu anlamda saldırı olarak\n" +
            "kabul edilmez bir kimsenin belli şekilde hareket etmesine izin veren veya emreden kuralların bulunmaması\n" +
            "gerekir hukuka uygunluk nedenleri varken gerçekleşen saldırılar haksız değildir örneğin bir tutuklama\n" +
            "emrini yerine getiren polis memuruna karşı şiddet uygulayan kimse meşru savunma durumunda olamaz\n" +
            "sadece insanların gerçekleştirdiği eylemler haksız olabilir hayvan saldırısı veya doğada gerçekleşen\n" +
            "olaylara karşı savunma meşru savunma olmaz ancak bir tehlike söz konusu olursa o zaman zorunluluk\n" +
            "halinden söz edilir eğer bir hayvan sahibi tarafından araç olarak kullanılıyorsa yani saldırıda bulunması için\n" +
            "yönlendiriliyorsa saldırgan hayvan değil hayvan sahibidir kişi haksız saldırıya kendisi neden olmuş olsa\n" +
            "bile haksız saldırıyı yapan kişi hukuken korunmadan mahrum bırakılamaz kendi haksız hareketiyle diğer\n" +
            "kişiyi meşru savunma durumuna sokmuşsa kişinin savunması meşru savunma sayılamaz" },
    { "header": "Metin 9 (kendisine veya)", "body": "kendisine veya başkasına ait bir hakka yönelik olup kişinin bilerek neden olmadığı başka şekilde korunma\n" +
            "olanağı bulunmayan ağır bir tehlikeden kurtulmak veya başkasını kurtarmak zorunluluğu ile işlenen fiiller\n" +
            "zorunluluk halini ifade eder tehlikenin ağırlığıyla konu ve kullanılan araç arasında orantı bulunması\n" +
            "koşuluyla işlenen fiillerden dolayı faile ceza verilmez zorunluluktan bahsedebilmek için yaklaşan bir\n" +
            "tehlike veya mevcut bir tehlike olmalıdır derhal korunma hareketi yapılmazsa korunmaya çalışılan yararın\n" +
            "zarar görme ihtimali daha büyük olabileceğinden yakın tehlike de mevcut tehlike olarak kabul edilir tehlike\n" +
            "durumunun nedeni önemli değildir insanın açlık susuzluk gibi ihtiyaçları veya doğal nedenler hatta insan\n" +
            "saldırısı da neden olabilir insan saldırısı durumunda saldırıya uğrayan kişinin hareketi saldırgana karşı değil\n" +
            "tehlikeye yabancı başka kimseye karşı olmalıdır zorunluluk hali gerçekleştiğinde tehlike mutlaka masum\n" +
            "üçüncü kişinin zarar görmesini haklı gösterecek ağırlıkta olmalıdır bu durumda hem tehlikenin ağır olması\n" +
            "hem de ortaya çıkabilecek zararın ağır olması gerekir örneğin tehlikeye neden olan kişi daha sonra yaptığı\n" +
            "hareketi bertaraf etmek amacıyla üçüncü kişilere zarar vermesi durumunda zorunluluk halinden\n" +
            "faydalanamaz tehlikeye kasten veya bilinçli taksirle sebep olan kişi bu durumdan faydalanamaz taksirli\n" +
            "hareketi nedeniyle tehlikeye sebep olan kimse tehlikeye bilerek neden olmuş sayılmaz tehlikeye bilerek\n" +
            "neden olunması failin hem iradi hareketle tehlikeye neden olması hem de tehlikeyi öngörmüş veya istemiş\n" +
            "olması anlamına gelmektedir korumaya ilişkin koşullarda kişinin fiilinin tehlikeden kurtulmak için zorunlu\n" +
            "olması gerekmektedir başka türlü kurtulma imkanı varsa suç işleyip tehlikeyi önleyen kişi zorunluluk\n" +
            "halinden faydalanamaz tehlikede bulunan hak başkasının hakkına zarar vermeden korunabilir bir haksa\n" +
            "zorunluluk hali yoktur örneğin kaçarak tehlikeyi önlemek mümkünse yine zorunluluk hali yoktur tehlikeye\n" +
            "maruz kalan kişi bu tehlikeye göğüs germe yükümlülüğündeyse bu kişi tehlikeyi bertaraf etmek için üçüncü\n" +
            "kişilere zarar verdiğinde zorunluluk halinden yararlanamaz örneğin gemi kaptanı olası bir tehlikede tüm\n" +
            "yolcuları tahliye ettikten sonra gemiyi terk edebilir bir komutan savunmaya yarayan tüm araçları\n" +
            "tüketmeden düşmana teslim olursa zorunluluk hali olmaz" },
    { "header": "Metin 10 (kanunun ayrı)", "body": "kanunun ayrı tuttuğu durumlar dışında sanık duruşmada hazır bulunmazsa hazır bulunmayan sanıkla ilgili\n" +
            "duruşma yapılmaz sanığın duruşmaya gelmemek için geçerli bir nedeni yoksa duruşmaya zorla getirme\n" +
            "kararı alınır ancak sanıkla ilgili elde edilen deliller dikkate alındığında mahkumiyet haricinde bir karar\n" +
            "verilmesi sonucuna ulaşılırsa dava sanığın yokluğunda bitirilir mahkemeye gelen sanığın duruşmanın\n" +
            "devam ettiği süre boyunca hazır olması sağlanır ve duruşmadan kaçmasını engelleyecek önlemler alınır\n" +
            "sanık sorguya çekilir ve artık duruşmada bulunmasına gerek kalmaz ise bu durumdaki sanık duruşmadan\n" +
            "çekilebilir ya da verilen aradan sonraki oturumlara katılmasa bile dava yokluğunda bitirilir mahkeme\n" +
            "tarafından sorgusu yapılan sanık ya da bu hususta sanık tarafından yetki verilen müdafi talepte bulunursa\n" +
            "mahkeme sanığı duruşmada hazır bulunmaktan bağışık tutabilir hastalık disiplin önlemi veya zorunlu diğer\n" +
            "sebeplerle yargılamanın yapıldığı yargı çevresi dışındaki bir hastane ya da tutukevine gönderilmiş sanığın\n" +
            "sorgusu yapılmışsa diğer celselere katılmamasına mahkeme tarafından karar verilebilir sanığın beş yıl hapis\n" +
            "ve daha fazla cezasını gerektiren suçlar dışındaki suçlar için istinabe yoluyla sorgusu yapılabilir sorgu için\n" +
            "saptanan gün cumhuriyet savcısı sanık ve müdafine iletilir cumhuriyet savcısı ile müdafinin sorgu işlemi\n" +
            "esnasında hazır bulunması zorunlu değildir sanığa sorgu işlemi başlamadan önce ifadesini esas mahkemesi\n" +
            "önünde verme isteği sorulur sorgu işlemine ait tutanak duruşmada okunur yurt içinde bulunan sanığın\n" +
            "sorgusu hakim veya mahkemenin zorunlu bulduğu hallerde görüntülü ve sesli iletişim tekniği kullanılarak\n" +
            "yapılır bu durumdaki sanığın duruşmalara aynı teknik aracılığıyla katılmasına karar verilir yurt dışında\n" +
            "olması sebebiyle duruşma tarihinde duruşmaya katılması mümkün olmayan sanık yönünden duruşmanın\n" +
            "yapılacağı tarihten önce duruşma açılarak veya istinabe yoluyla sorgusu yapılabilir duruşmada sanığın\n" +
            "yüzüne karşı suç ortaklarından birisinin ya da bir tanığın doğruyu söylemeyeceği izlenimi oluşabilir bu\n" +
            "durumda mahkeme sorgu ve dinleme işlemi esnasında sanığı mahkeme salonundan çıkarma kararı alabilir\n" +
            "sanık tekrar geldiğinde ise tutanaklar okunur duruşma anında savcı ya da müdafi sanığa katılana tanıklara\n" +
            "ve duruşmaya çağrılan diğer kişilere doğrudan soru sorabilirler" },
    { "header": "Metin 11 (soruşturma evresinde)", "body": "soruşturma evresinde hakkında suç işlediği şüphesi bulunan kişilere şüpheli denir kovuşturma evresinin\n" +
            "başlamasından hükmün kesinleşmesine kadar geçen süreçte hakkında suç şüphesi bulunan kişilere ise sanık\n" +
            "denir şüpheli ve sanık ceza muhakemesi sürecinde savunma makamı olarak yer alır şüpheli veya sanık\n" +
            "savunma hakkını kendisi kullanabileceği gibi istemesi halinde savunma sürecinde müdafiden yararlanabilir\n" +
            "bir şüphelinin sanık sıfatı alması için soruşturmada elde edilen deliller ile yeterli şüpheye ulaşılması ve\n" +
            "buna dayanarak savcı tarafından hazırlanan iddianamenin mahkeme ya da hakim tarafından kabulü gerekir\n" +
            "şüpheli ve sanık muhakeme süreci tamamlanıp kesin hüküm verilinceye kadar suçlu veya suçsuz olarak\n" +
            "ifade edilemez şüpheli veya sanık hakkında suç işlediği şüphesi mevcutsa nihayetinde insan olduğu\n" +
            "unutulmamalı ve insanlık onuruna yakışmayan uygulamalara maruz bırakılmamalıdır şüpheli ve sanık ceza\n" +
            "muhakemesinde birçok haklara sahiptir ceza muhakemesinin temel ilkeleri aynı zamanda şüpheli ve sanığın\n" +
            "hakları olarak kabul edilir şüpheli ve sanık hakları arasında haklarını ve yapılan suçlamayı öğrenme hakkı\n" +
            "yakınlarına haber verilmesini isteme hakkı susma hakkı delillerin toplanmasını talep etme hakkı dosyayı\n" +
            "inceleme ve dosyadan örnek alma hakkı müdafiden yararlanma hakkı ve lekelenmeme hakkı bulunmaktadır\n" +
            "şüpheli veya sanığa soruşturma ve kovuşturma evrelerinde hakkında işlem yapılan ilk anda yetkili\n" +
            "makamlar tarafından hakları açıklanır müdafi seçme hukuki yardımdan faydalanma susma ve delillerin\n" +
            "toplanmasını isteme hakları olduğu kendisine bildirilir ayrıca şüpheli ve sanığa kendisine yöneltilen\n" +
            "suçlamanın ne olduğu bildirilir ifade alınması veya sorguya çekilme işlemi gerçekleşmeden önce şüpheli\n" +
            "ya da sanığa kendisine yöneltilen isnadın ne olduğu açıklanır susma hakkı şüpheli ve sanığın kendisine\n" +
            "yöneltilen suç hakkında açıklama yapmamasıdır kişi bu hakkı hiçbir soruya cevap vermeyerek tamamen\n" +
            "bazı sorulara cevap verip bazılarına vermeyerek kısmen de kullanabilir sanığın kendisine yöneltilen suç\n" +
            "isnadını çürütmek için lehine olan delillerin toplanmasını talep etme hakkı mevcuttur ayrıca sanığa\n" +
            "kendisini savunarak isnat olunan suç şüphesini ortadan kaldırma hakkı tanınır şüpheli ve sanık ceza\n" +
            "soruşturması ve kovuşturmasının her aşamasında bir müdafiden yararlanma hakkına sahiptir" },
    { "header": "Metin 12 (ön inceleme)", "body": "ön inceleme aşaması sona erdikten sonra sözlü yargılama için taraflar duruşmaya davet edilir taraflara\n" +
            "duruşma için davetiye gönderilir davetiyede tarafların belirlenen gün ve saatte geçerli bir mazereti olmadan\n" +
            "duruşmaya gelmemeleri halinde yokluklarında devam edileceği yazılır bu aşamadan sonra devam edilen\n" +
            "duruşma süreci için yapılan işlemlere itiraz etme haklarının sona erdiği bildirilerek sözlü yargılamada\n" +
            "duruşmanın ertelenmesi halinde tekrar davetiye gönderilmeyeceği bildirilir duruşmaya usulüne uygun\n" +
            "olarak davet edilmiş olan taraflar duruşmaya gelmez ya da gelip de davayı takip etmezler ise bu durumda\n" +
            "dosyanın işlemden kaldırılmasına karar verilir usulüne uygun şekilde davet edilmiş olan taraflardan biri\n" +
            "duruşmaya gelir diğeri gelmezse gelen tarafın talebi üzerine yargılamaya gelmeyen tarafın yokluğunda\n" +
            "devam edilir veya dosya işlemden kaldırılır geçerli bir sebebi olmadan duruşmaya gelmeyen taraf\n" +
            "yokluğunda yapılan işlemlere itiraz edemez mahkeme taraflardan birinin talebi üzerine talep eden tarafın\n" +
            "veya vekilinin aynı anda ses ve görüntü nakli yoluyla bulundukları yerden duruşmaya katılmalarına ve usul\n" +
            "işlemleri yapmalarına karar verebilir mahkeme resen veya taraflardan birinin talebi ile tanık bilirkişi ya da\n" +
            "uzmanın aynı anda ses ve görüntü nakli yoluyla bulundukları yerden dinlenilmesine karar verebilir\n" +
            "mahkeme tarafların üzerinde serbestçe tasarruf edemeyecekleri dava ve işlerde ilgililerin aynı anda ses ve\n" +
            "görüntü nakledilmesi yoluyla bulundukları yerden dinlenilmesine resen karar verebilir mahkeme fiziki\n" +
            "engel veya güvenlik sebebiyle duruşmanın il sınırlarının içinde başkaca yerde yapılmasına yargı çevresi\n" +
            "içinde yer aldığı bölge adliye mahkemesi adalet komisyonunun uygun görüşünü alarak karar verebilir\n" +
            "hakim duruşma esnasında düzeni bozan kişinin avukatlar hariç duruşma salonundan çıkarılmasını emreder\n" +
            "kişi uyarıya rağmen mahkemenin düzenini bozmaya devam ederse uygun olmayan söz söyler ve\n" +
            "davranışlarda bulunursa yakalanır ve hakkında dört güne kadar disiplin hapsi uygulanır bu hüküm avukatlar\n" +
            "hakkında uygulanmaz mahkeme huzurunda söylenen sözler ve uygun olmayan davranışlar suç teşkil\n" +
            "ediyorsa bu durum tutanak altına alınarak cumhuriyet başsavcılığına bir yazı ekinde gönderilir suç teşkil\n" +
            "eden fiili işleyen kişinin avukatlar hariç gerekiyorsa tutuklanmasına karar verilir" },
    { "header": "Metin 13 (duruşma herkese)", "body": "duruşma herkese açıktır ancak genel ahlakın veya kamu güvenliğinin kesin olarak gerekli kıldığı hallerde\n" +
            "duruşmanın bir kısmının veya tamamının kapalı yapılmasına mahkemece karar verilebilir duruşmanın\n" +
            "kapalı yapılması konusundaki gerekçeli karar ile hüküm açık duruşmada açıklanır sanık on sekiz yaşını\n" +
            "doldurmamışsa duruşma kapalı yapılır hüküm de kapalı duruşmada açıklanır bu duruma zorunlu kapalılık\n" +
            "denilir kapalı duruşmada mahkeme bazı kişilerin hazır bulunmasına izin verebilir bu halde adı geçenler\n" +
            "duruşmanın kapalı olmasını gerektiren hususları gizli tutması için uyarılır ve bu husus tutanağa yazılır\n" +
            "kapalı duruşmanın içeriği hiçbir iletişim aracıyla yayımlanamaz açık duruşmanın içeriği milli güvenliğe\n" +
            "genel ahlaka kişilerin saygınlık onur ve haklarına dokunacak veya suç işlemeye sevk edecek ölçüde ise\n" +
            "mahkeme bunları önlemek amacıyla ve gerektiğinde duruşmanın içeriğinin kısmen ya da tamamen\n" +
            "yayımlanmasını yasaklar ve kararını açık duruşmada açıklar sanığın sorguya çekilmesinden sonra delillerin\n" +
            "ortaya konulmasına başlanır ancak sanığın tebligata rağmen mazeretsiz olarak duruşmaya gelmemesi\n" +
            "sebebiyle sorgusu yapılamamış ise bu durum delillerin ortaya konulmasına engel olamaz ortaya konulan\n" +
            "deliller sonradan gelen sanığa bildirilir cumhuriyet savcısı ile sanık ya da müdafi birlikte rıza gösterirler ise\n" +
            "tanığın dinlenmesi veya başka herhangi bir delilin ortaya konulmasından vazgeçilir delilin ortaya konulması\n" +
            "istemi bunun veya ispat edilmek istenen olayın geç bildirilmiş olması nedeniyle reddedilemez ortaya\n" +
            "konulması istenilen bir delil kanuna aykırı olarak elde edilmişse reddedilir ortaya konulan deliller ile ilgili\n" +
            "tartışmada söz sırasıyla katılana veya vekiline cumhuriyet savcısına sanığa ve müdafine veya kanuni\n" +
            "temsilcisine verilir cumhuriyet savcısı katılan veya vekili sanık müdafinin veya kanuni temsilcisinin\n" +
            "açıklamalarına sanık müdafi ya da kanuni temsilcisi de cumhuriyet savcısının katılanın veya vekilinin\n" +
            "açıklamalarına cevap verebilir hüküm öncesi son söz hazır bulunan sanığa verilir bu aşamada zorunlu\n" +
            "müdafinin hazır olmaması hükmün verilmesine engel teşkil etmez hakim kararını ancak duruşmaya\n" +
            "getirilmiş ve tartışılmış delillere dayandırır bu deliller hakimin kanaatiyle takdir edilebilir yüklenen suç\n" +
            "hukuka uygun her türlü delille ispat edilebilir duruşma için tutanak tutulur" },
    { "header": "Metin 14 (görevsizlik yetkisizlik)", "body": "görevsizlik yetkisizlik birleştirme ayırma davanın nakli ve durma gibi kararlar usule yönelik kararlardır\n" +
            "iddianamenin kabulü sonrası işin davayı gören mahkemenin görevini aştığı ya da dışında kaldığı anlaşılırsa\n" +
            "mahkeme bir kararla işi görevli mahkemeye gönderir davaya bakan mahkeme görevli olup olmadığına\n" +
            "kovuşturma evresinin her aşamasında resen karar verebilir görev ile ilgili mahkemeler arasında uyuşmazlık\n" +
            "çıkması halinde görevli mahkemeyi ortak yüksek görevli mahkeme belirler duruşmada suçun hukuki\n" +
            "niteliğinin değişmesi ile görevsizlik kararı verilerek dosya alt dereceli mahkemeye gönderilemez görevli\n" +
            "olmayan hakim ya da mahkeme tarafından yapılan yenilenebilecek bütün işlemler hükümsüzdür adli yargı\n" +
            "içindeki mahkemeler bakımından verilen görevsizlik kararlarına karşı itiraz yoluna gidilebilir davaya\n" +
            "bakma yetkisi suçun işlendiği yer mahkemesine aittir suçun işlendiği yer belli değilse şüpheli ya da sanığın\n" +
            "yakalandığı yer yakalanmamışsa yerleşim yeri mahkemesi yetkilidir birkaç hakim veya mahkeme arasında\n" +
            "olumlu ya da olumsuz yetki uyuşmazlığı çıkarsa ortak yüksek görevli mahkeme yetkili hakimi veya\n" +
            "mahkemeyi belirler yetkisizlik kararını ilk derece mahkemesince sanığın sorgusundan önce bölge adliye\n" +
            "mahkemesince duruşmasız işlerde incelemenin hemen başında duruşmalı işlerde inceleme raporu\n" +
            "okunmadan önce verilir bu aşamadan sonra yetkisizlik itirazı olamayacağı gibi mahkemeler de bu hususta\n" +
            "resen karar veremez yetkisizlik kararına karşı itiraz yoluna gidilebilir mahkeme bakmakta olduğu birden\n" +
            "çok dava arasında bağlantı görür ise birlikte bakmak ve hükme bağlamak üzere bu davaların birleşmesine\n" +
            "karar verebilir birleşen davalarda bu davaları gören mahkemenin tabi olduğu yargılama usulü uygulanır\n" +
            "davaların ayrılması kararı yargılamanın daha sağlıklı yürütülmesi adına birlikte açılmış ya da sonradan\n" +
            "birleştirme kararı verilmiş davaların ayrı olarak görülmesi için verilen bir karardır işin esasına girdikten\n" +
            "sonra ayrılan davalara aynı mahkeme devam eder kovuşturma evresinin her aşamasında bağlantılı ceza\n" +
            "davalarının birleşmesine veya ayrılmasına yüksek görevli mahkeme karar verir yetkili hakim veya\n" +
            "mahkeme hukuki veya fiili sebeplerle görevini yerine getiremeyecek herhangi bir durumda bulunurlarsa\n" +
            "yüksek görevli mahkemece davanın başka bir yerde bulunan aynı derecede mahkemede görülmesi için\n" +
            "nakline karar verilir" },
    { "header": "Metin 15 (takip talebiyle)", "body": "takip talebiyle birlikte icra dairesi borçluya ödeme emri gönderir borçlu süresinde itiraz etmezse ödeme\n" +
            "emri kesinleşir bu aşamada alacaklının cebri icra talebine devam etmesine haciz talebi denir alacaklının\n" +
            "haciz talebinde bulunmasından sonraki üç gün içerisinde alacaklının faiziyle birlikte giderler dahil olmak\n" +
            "üzere borçludan alacağı menkul gayrimenkul mallar ya da alacak haklarının miktarı kadar haciz işlemi\n" +
            "yapılır bu işlemi yetkili icra dairesi memuru yapar borçlu haciz işlemi yapan icra dairesi görevlilerine\n" +
            "kıymetli mallarını göstermeye mecburdur görevlilerin gerekirse kolluk kuvvetleri aracılığıyla zor kullanma\n" +
            "yetkileri vardır icra dairesi görevlileri haczedilen her kıymetli malı takdir ettikleri kıymeti ile birlikte haciz\n" +
            "tutanağına yazar kıymet takdiri konusunda şüphe olan durumlarda bilirkişiye başvurulur alacaklının dışında\n" +
            "başka alacaklıların da hacze iştirak etmesi için yapılan takip talebi veya icra mahkemesinde açılan davadan\n" +
            "önce işleme konulmuş geçerli belgelere sahip olmaları gerekir ayrıca yapılan haciz işlemi satış yoluyla\n" +
            "paraya çevrilmemiş olmalıdır davadan takip talebinden önce alınan bir aciz vesikası ilam senet veya resmi\n" +
            "dairelerden alınan hak doğurucu belge olmadan hacze iştirak edilemez borçlunun taşınmazının\n" +
            "haczedilmesi için tapuda üzerine kayıtlı olması yeterlidir icra müdürlüğü ilgili taşınmazın kayıtlı bulunduğu\n" +
            "tapu sicil müdürlüğüne haciz yazısı yazarak haciz işlemini gerçekleştirir borçlunun taşınır malları ise icra\n" +
            "dairesi görevlileri tarafından kıymet takdiri yapılarak bulunduğu yerde haciz tutanağına geçirilir borçlunun\n" +
            "üçüncü şahıslar üzerindeki hak ve alacakları için de taşınır mallara özgü haciz işlemleri uygulanır icra\n" +
            "müdürlüğü talebe istinaden üçüncü kişi adına bir haciz ihbarnamesi gönderebilir üçüncü kişilerin\n" +
            "haczedilen malları arasında sadece taşınır olanları için hak iddiasında bulunmaları mümkündür\n" +
            "bulundukları iddiaya istihkak iddiası denir haciz işlemi yapılırken haciz yapılan mallar üzerinde borçlunun\n" +
            "dışında başka birinin de sahipliği olduğu borçlu ya da üçüncü bir şahıs tarafından iddia edilirse bu iddia\n" +
            "icra müdürlüğünce tutanak altına alınır icra dairesi iddiayı taraflara tebliğ eder tarafların beyanları için\n" +
            "kendilerine üç günlük süre verilir konunun tarafları verilen süre zarfında itiraz etmezlerse iddia kabul\n" +
            "edilmiş sayılır" },
    { "header": "Metin 16 (dilekçeler bireylerin)", "body": "dilekçeler bireylerin muhatabına meramını anlattığı yazılı metinlerdir bu metinlerin hukuk kuralları ile\n" +
            "belirlenmiş şekil şartları olsun ya da olmasın her dilekçede mutlaka uyulması gereken bazı şartları vardır\n" +
            "diğer bir deyişle meramın düzgün ve etkin biçimde ifade edilmesinde yazılı olmasa da olağan özellikler\n" +
            "bulunmaktadır ilkokul yıllarımızdan itibaren türkçe derslerinde türkçe dil bilgisi kuralları yazım imla ve\n" +
            "noktalama kompozisyon yazımı gibi dersler verilmiştir bu derslerde yıllardır öğretilen hususlar bugün basit\n" +
            "bir dilekçe yazımında en temel özellikler olarak karşımıza çıkar buradan hareketle herhangi bir dilekçenin\n" +
            "sahip olması gereken genel özellikler şu şekilde sıralanabilir dilekçeler çizgisiz kağıda yazılır dilekçe\n" +
            "yazarken el yazısı ya da bilgisayar kullanılabilir el yazısının kullanılması durumunda tükenmez veya dolma\n" +
            "kalem kullanılmalıdır kurşun kalemle dilekçe yazılmamalıdır dilekçe kağıdın bir yüzüne yazılır kağıdın\n" +
            "arkalı önlü kullanımı uygun değildir ayrıca sayfanın üst kısmında altında sol ve sağ yanlarında boşluk\n" +
            "bırakılmalı ve dilekçe metni sıkışık bir biçimde yazılmamalıdır bazı dilekçe örnekleri başvurular için tek\n" +
            "tip bir formatın uygulanması ve kişilere kolaylık sağlaması bakımından matbu olarak bulunur bu matbu\n" +
            "dilekçelerin uygun biçimde doldurulması ile başvuru yapılabilir dilekçede sonradan silme tahrifat kazıntı\n" +
            "olmamalıdır başka bir imkanın bulunmadığı durumlarda ise dilekçe üzerinde yapılan bu değişikliğin\n" +
            "bilginiz dahilinde olduğunu ifade eden ilgili yerin paraflanması yöntemi kullanılabilir dilekçe metni açık\n" +
            "ve anlaşılır bir şekilde ele alınmalıdır kelimeler kısaltılarak yazılmamalıdır dilekçede hitap metin tarih ad\n" +
            "ve soyad imza iletişim bilgileri ve varsa ekler bölümü bulunur basit kompozisyon yapısı konularında\n" +
            "öğrendiğimiz gibi metin temel olarak giriş gelişme sonuç kısımlarından oluşur benzer şekilde dilekçe de bu\n" +
            "bölümlerden oluşmaktadır dilekçelerin giriş bölümünde olay anlatılır gelişme bölümünde ilgili soruna\n" +
            "ilişkin istekler talepler dile getirilir sonuç kısmında ise saygı sunumu ve arz kısmı bulunur dilekçelerin açık\n" +
            "ve anlaşılır biçimde yazılması için öncelikle türkçe hakimiyetinin iyi olması gerekir dilin gerek konuşma\n" +
            "gerek yazıda etkin ve zengin kullanılması çocuk yaşlardan itibaren kazanılan okuma alışkanlığı ile oldukça\n" +
            "ilişkilidir" },
    { "header": "Metin 17 (tipe uygun hukuka)", "body": "tipe uygun hukuka aykırı kusurlu insan davranışı olarak tanımlanan suç karşılığında uygulanan yaptırıma\n" +
            "ceza denir cezalar hürriyeti bağlayıcı nitelikte olabileceği gibi para cezası da olabilir yine hürriyeti bağlayıcı\n" +
            "nitelikteki cezalar tek tip olmayıp işlenen suçun özelliğine göre farklı sürelerle belirlenebilir ayrıca\n" +
            "belirtmek gerekir ki ceza mutlak suretle bir suçun karşılığı olmak zorunda değildir kabahat niteliğindeki\n" +
            "düzene aykırılık eylemleri için de öngörülen yaptırımlar arasında idari para cezaları bulunmaktadır ve bu\n" +
            "cezalar da infaz hukukunun konusunu oluşturmaktadır geleneksel olarak cezanın amaçlarını iki grupta\n" +
            "toplamak mümkündür birincisi ceza ödetmeye hizmet eder diğer bir deyişle işlenmiş kusurlu fiilin kuralları\n" +
            "ihlal etmesine misilleme tepkisidir ikincisi önlemeye hizmet etmektedir yani toplum veya bireyler üzerinde\n" +
            "etkili olmak suretiyle suçu önlemeye çalışmaktadır bugün baskın görüş ödetici ve önleyici amaçları\n" +
            "bütünleştirmiş bulunan karma görüştür bu bağlamda ceza bir yandan suçluyu topluma uyumlu hale\n" +
            "getirmeyi gerekirse toplumdan dışlamayı amaçlarken öte yandan yasada düzenlenmek ve infaz edilmek\n" +
            "suretiyle korkutmalıdır gerçekten bugün uzlaştırıcı teoriler geçerli olup bu teorilerin ulaştığı çizgi ceza\n" +
            "hukukunun günümüzdeki özel işlevini de ortaya koyar ceza hukukuna özgü amaçlardan ilki toplumsal\n" +
            "yaşam yönünden en önemli değerleri özel biçimde korumaktır ceza temel hak ve özgürlükleri sınırlandırmış\n" +
            "olduğundan ancak önemli durumlarda ortaya çıkabilir kural olarak örneğin bir sözleşmenin ihlali\n" +
            "cezalandırılmaz bu yönüyle ceza hukuku hukuk sisteminin içinde diğer hukuk dallarına yardımcıdır son\n" +
            "çaredir bunun zorunlu bir sonucu olarak ceza hukuku yaptırımları arasında da özgürlüğü bağlayıcı ceza son\n" +
            "çare olarak görülmelidir genel ve özel önleme ceza hukukunun özel işlevi bakımından önemli rol\n" +
            "oynamaktadır genel önlemenin bir işlevi yerine getirdiği muhakkaktır ancak özel önlemenin gerçekleşmesi\n" +
            "yani bireyin uslanarak yeniden topluma kazandırılması için infaz konusunda bazı özel düzenlemelere\n" +
            "ihtiyaç duyulmaktadır bu nedenle özellikle infaz hukuku temel ilkeleri belirlenmiş ve infaz kurumları\n" +
            "yeniden şekillenmiştir gerekli önlem alınsa da cezaevindeki psikolojik durum bireyi farklı eylemlere sevk\n" +
            "eder bu durum özellikle kısa süreli cezalarda dikkat çekmektedir" },
    { "header": "Metin 18 (hukukun tanımlanması)", "body": "hukukun tanımlanması ve doğasının ya da öz niteliğinin kavranması için hukukun temel işlevlerinin\n" +
            "bilinmesi zorunludur hukukun temel işlevlerini üç ana başlık altında toplayabiliriz bunlar hukukun düzen\n" +
            "sosyal gereksinimleri karşılama ve adalet işlevleridir her ne kadar hukukun tanımlanması konusunda bir\n" +
            "görüş birliğinin varlığı söz konusu değilse de hukukun işlevsel açıdan adalete yönelen toplumsal yaşam\n" +
            "düzeni olarak tanımlanması mümkündür hukuk kavramının tanımı gereğince düzen adalet ve sosyal\n" +
            "gereksinimleri karşılama olmak üzere üç temel işlevi bulunmaktadır buna bağlı olarak hukuk normlarının\n" +
            "biçim sosyal olgu değer yargısı olmak üzere üç temel karakteri söz konusudur belirtildiği üzere hukukun\n" +
            "üç temel işlevinin analizi hukukun doğasının kavranmasına imkan tanır ancak temel işlevlerin analizi\n" +
            "dışında bu işlevler arasındaki çelişkilerin de ortaya konulması zorunludur zira hukukun doğasında\n" +
            "mündemiç bulunan bu temel işlevler arasında çatışık bir ilişkiler ağı bulunmaktadır örneğin hukukun düzen\n" +
            "işlevi somut hukuksal olayların kendilerine özgü niteliklerini göz ardı eden bir şekillenmeye yönelirken\n" +
            "adalet işlevi hakkaniyet ilkesi gereği somut hukuksal olayların özelliklerini dikkate alır hukukun öz\n" +
            "niteliğinden kaynaklı bu çelişkilerin tümden ortadan kaldırılması olası değildir ancak bu işlevler arasında\n" +
            "bir uyumu ya da bütünlüğü sağlama olasılığı söz konusudur hukukun bu temel işlevleri bağlamında adalet\n" +
            "işlevinin temel nihai amacı oluşturduğunun ifade edilmesi gerekmektedir hukukun tanımında olduğu gibi\n" +
            "amacının belirlenmesinde de bir görüş birliği söz konusu değildir hukukun amaçları bağlamında düzen\n" +
            "güvenlik adalet özgürlük ve eşitlik gibi bazı kavramlar gündeme gelmektedir insanın doğası gereği\n" +
            "toplumsal bir varlık oluşu toplumsal yaşam düzenini gerekli kılmaktadır insanlık tarihi boyunca bu ihtiyacın\n" +
            "bir yansıması olarak insanlar bir takım kurallar ile sosyal yaşamlarını düzenlemeyi amaçlamıştır bu hedef\n" +
            "kapsamında ahlak din örf ve hukuk kuralları toplumsal düzeni sağlamayı amaçlayan kurallar bütünü olarak\n" +
            "ortaya çıkmışlardır bu düzenleyici kurallar bütününün en önemlisini oluşturan hukuk öncelikle bir düzen\n" +
            "kavramını ifade etmektedir hukuk düzeni belirli bir formda varlık kazanmaktadır düzenin bir gereği olarak\n" +
            "form hukukun kendi öz niteliğinin bir parçasını oluşturmaktadır" },
    { "header": "Metin 19 (ispat bir olayın)", "body": "ispat bir olayın veya olgunun varlığı ya da yokluğu konusunda hakimin kanaat sahibi olmasına yönelik\n" +
            "faaliyet olarak tanımlanabilir bir hususu ispatlamaya çalışmak bu konu hakkında hakimi ikna etmek\n" +
            "anlamına gelir bir davada iddia ve savunmaya bağlı olarak karşılıklı iddiaları ispatlamaya yarayan kanıtların\n" +
            "toplanarak mahkemeye sunulması tarafların yükümlülüğü altındadır bir davada davacı somut olay\n" +
            "bakımından iddiasını dayandırdığı olguları davalı ise savunmasını dayandırdığı olguları ispat etmek\n" +
            "zorundadır hukuk hayatında bir olayın kimin tarafından ispat edilmesi gerektiği sorununa ispat yükü denir\n" +
            "türk medeni kanununa göre kanunda aksine bir hüküm bulunmadıkça taraflardan her biri hakkını\n" +
            "dayandırdığı olguların varlığını ispatla yükümlüdür hükümden anlaşılacağı üzere kural olarak iddia eden\n" +
            "iddiasını ispatla yükümlüdür ancak burada yükümlülük değil bir yük vardır diğer bakış açısıyla kişi\n" +
            "iddiasını ispat edemezse diğer taraf onun ispatını isteyemez bu genel kuralı takiben ispat yükünün bazı\n" +
            "istisnalarının olduğuna işaret edilmiştir istisnalardan bahsetmek gerekirse olağan durumun aksini ispat iddia\n" +
            "eden tarafa düşmektedir örneğin kural on sekiz yaşını tamamlamış kişinin tam fiil ehliyetinin bulunmasıdır\n" +
            "bu kişinin hukuki bir işlem yapması halinde fiil ehliyetinin bulunduğu kabul edilecek aksini iddia eden\n" +
            "iddiasını ispat etmek zorunda kalacaktır herkes tarafından bilinen olayların ispatına gerek bulunmamaktadır\n" +
            "bunun aksini iddia eden iddiasını ispatla yükümlüdür ispat yükünün özel olarak kanun hükmüyle\n" +
            "belirlendiği durumlarda ispat yükü özel kanun hükmünde yazılı kimseye düşmektedir örneğin borçlar\n" +
            "kanunu hükümleri gereği haksız eylemde zararı ispat etmek davacıya aittir kanun birtakım karineler\n" +
            "koyarak o karineye dayanan tarafı ispat yükünden kurtarmıştır karine belirli olaydan veya varlığı bilinen\n" +
            "olgudan belirli olmayan olay veya varlığı bilinmeyen olgunun çıkarılması anlamına gelmektedir karineler\n" +
            "fiili ve kanuni karineler olmak üzere ikiye ayrılmaktadır fiili karineler belirli bir olaydan belirli olmayan\n" +
            "bir olay için hakim tarafından çıkartılan sonuçtur kanuni karinelerse bir olaydan belirli olmayan bir olay\n" +
            "için kanun tarafından çıkartılan sonuçlardır bazı kanuni karinelerse kesin karine olup aksi ispat edilemez\n" +
            "örneğin tapu siciline kayıtlı olan hususların bilinmediği ileri sürülemez" },
    { "header": "Metin 20 (kurum ve kuruluşlarda) ", "body": "kurum ve kuruluşlarda üretilen belgelerin korunması da en az belge yönetiminin diğer unsurları kadar\n" +
            "önemlidir belgelerin uzun zaman boyunca zarar görmeden korunmasının yanı sıra kurumsal ve\n" +
            "belgelenebilecek yapıya uygun bir saklama planının tasarlanması gerekir dosyalar öncelikle güneş ışınları\n" +
            "rutubet yangın ve su baskınları gibi tehlikelerden korunmalıdır belgelerin fiziksel özelliğini bozan bazı\n" +
            "zararlı etkilerin de mümkün olduğunca azaltılması gerekir bunlar kağıt içindeki asit miktarı bakteri toz\n" +
            "haşere gibi zararlı etkenlerden kaynaklanır ayrıca gizli ve önemli belgelerin tahrip olmasının çalınmasının\n" +
            "veya kopyalanmasının önüne geçilmesi de son derece önemlidir bu tür belgeler gerekli görüldüğü takdirde\n" +
            "ayrı ve güvenli bir yerde tutulmalıdır belgeleri korumanın üç önemli nedeni vardır bunlar belgeleri bilgi\n" +
            "kaybına neden olacak her türlü tahrip edici unsura karşı korumak belgelerin kaybolmasını önlemek\n" +
            "belgelerin ilk haldeki gibi asli düzenlerinin bozulmasını engellemek şeklinde sıralanabilir işaret edilen bu\n" +
            "nedenler belgelerin hem fiziksel olarak korunmaları hem de belgelere erişimin doğru eksiksiz ve hızlı\n" +
            "sağlanması ile ilişkilidir kurum ve kuruluşlarda belge yönetiminin son aşaması arşiv çalışmalarıdır\n" +
            "kurumların faaliyetlerinin sonucunda ortaya çıkan ve çeşitli kullanım alanları olan belgeler belirli bir süre\n" +
            "saklandıktan sonra arşivlerde muhafaza edilir bu bağlamda arşivler kurum ve kuruluşların bilgi depolarıdır\n" +
            "arşiv malzemesinin uzun süre güvenli bir ortamda sağlam bir şekilde muhafaza edilebilmesi için arşivleme\n" +
            "araçlarına ihtiyaç duyulur arşiv malzemelerinin ne tür kaplarda saklanacağı bunları yerleştirecek raflar\n" +
            "dosya dolabı imha makinesi gibi arşivleme araçları da en az arşiv araçları kadar önem taşır plastik veya\n" +
            "karton malzemelerden üretilen kutuların içerisine arşivlenecek malzemeler belirli bir düzene göre\n" +
            "yerleştirilir arşivlenecek malzemenin dağılmadan toplu bir şekilde saklanması sağlanır arşiv kutularının\n" +
            "içerisine koyulan arşiv malzemelerinin içeriği hakkında kutunun dışına bilgiler yazılır arşiv süresi kısa olan\n" +
            "ve bir süre sonra imha edilmesi planlanan arşiv aletlerinin istifinde arşiv kutuları tercih edilir bu kutuların\n" +
            "sık sık hareket etmesi zarar vereceğinden kalıcı bir şekilde istifine özen gösterilir arşiv malzemesi saklama\n" +
            "kutusu ucuzdur hiçbir metal ve kimyasal madde olmadan katlama usulü yapılır arşiv malzemesi bırakıp\n" +
            "tekrar rahatça çıkarılabilecek şekilde kapatılır" },
    { "header": "Metin 21 (yasal temsil dava)", "body": "yasal temsil dava ehliyeti olmayan kişiler için öngörülmüş temsildir ayrıca tüzel kişilerin kendilerini temsile\n" +
            "yetkili organı aracılığıyla temsil edilmesi yasal temsil kapsamında değerlendirilir yasal temsilin hangi\n" +
            "hallerde mümkün olduğu içeriği ve sona ermesi kanunla belirlenir yasal temsilci temsil ettiği kişi adına\n" +
            "hareket eder bu sebeple davanın açılıp açılmayacağına tek başına karar veremez örneğin davanın açılması\n" +
            "için izin gerekliyse yasal temsilci izin belgelerini mahkemeye vererek dava açabilir gerekli olan belgelerin\n" +
            "mahkemeye verilmemesi durumunda dava açılmamış sayılır türk hukuk sisteminde avukatla temsil zorunlu\n" +
            "değildir bu nedenle dava ehliyeti bulunanlar kendi davasını açıp takip edebilir veya atadığı bir temsilci\n" +
            "aracılığıyla davasını açabilir ve takip edebilir bu tür durumlarda iradi temsil söz konusu olur iradi temsil\n" +
            "tarafların iradelerine dayanan temsildir davanın taraflarından herhangi birisi kendisini temsil edecek kişiye\n" +
            "vekalet vererek davayı takip etmek isteyebilir ancak vekalet verilecek kişiler yalnızca baroya kayıtlı\n" +
            "avukatlardır kişiler noterde yapacakları işlemle baroya kayıtlı avukatlar arasından bir veya birkaçına vekalet\n" +
            "verebilir vekalet temsil yetkisi bakımından genel vekalet ve özel vekalet olmak üzere ikiye ayrılır genel\n" +
            "vekalet davada gerekli olan işlemlerin tamamını yapabilme yetkisidir ancak genel vekaleti olan kişilerin\n" +
            "vekalet verenin izni olmadan yapamayacağı işlemler de bulunmaktadır hukuk muhakemeleri kanununa göre\n" +
            "temsilcilerin sulh olma davanın tamamını ıslah etme hakimi reddetme yemin teklif etme yemin kabul etme\n" +
            "gibi bazı işlemleri yapabilmesi açık yetki verilmesiyle mümkündür belirli bir veya birkaç işlemin temsilci\n" +
            "aracılığıyla yapılmasına olanak veren vekalet türüne ise özel vekalet denir özel vekaletname olarak\n" +
            "düzenlenmiş vekaletnamede temsilcinin yapabileceği işlemler yer aldığı için temsilci bu işlemlerin dışında\n" +
            "işlem yapamaz dava devam ederken taraflardan birisinin kendisine yardım etmek üzere üçüncü kişiye\n" +
            "davayı haber vermesine davanın ihbarı denir davanın ihbarı genel itibarıyla davaya müdahale değildir\n" +
            "nitekim davaya müdahale üçüncü kişinin kendi isteğiyle gerçekleşir mecburi dava arkadaşlığının mevcut\n" +
            "olduğu durumlarda davanın ihbarı söz konusu değildir davanın ihbarının ilk koşulu ihbar yapılacak kişinin\n" +
            "davanın tarafı olmayan üçüncü kişi olmasıdır ihbarda bulunan tarafın ihbarda bulunmak için herhangi bir\n" +
            "makamdan izin almasına gerek yoktur" },
    { "header": "Metin 22 (toplum düzeninin)", "body": "toplum düzeninin ayakta kalması ve sosyal barışın korunması için kişilerin sahip olduğu hakları hukuk\n" +
            "düzeni korumalıdır hukukun tek işlevi kişilerin sahip olduğu hakları düzenlemek değildir hukuk düzeninin\n" +
            "bir yandan kişilerin haklarını tanıması diğer yandan kendiliğinden hak almayı yasaklaması sonucu bireysel\n" +
            "hakların korunması devletin sorumluluğu altına girmiştir devlet bu sorumluluğu nedeniyle mahkemeler\n" +
            "kurmuş ve kişilere dava hakkı tanımıştır dava hakkı bir kişinin hak elde etmek veya sahip olduğu hakkın\n" +
            "korunmasını temin amacıyla devletin tarafsız ve bağımsız mahkemelerine başvurma hakkını ifade\n" +
            "etmektedir kişinin dava hakkını kullanarak mahkemeye başvurması ve devletin hak dağıtmada harekete\n" +
            "geçmesini istemesine dava denilmektedir dava medeni yargılama hukukunda taraf sistemi üzerine\n" +
            "kurulmuştur davayı açan kişiye davacı kendisine karşı dava açılan kişiye ise davalı denir karşılıklı\n" +
            "uyuşmazlığın bulunduğu çekişmeli bir yargıda hakim davalı ve davacı rolünde olan tarafların olup\n" +
            "olmadığını göz önünde bulundurur çünkü çekişmeli yargıda davacı ve davalının olması dava şartlarından\n" +
            "biridir dava şartları ise davanın açılması ve dava konusu anlaşmazlık hakkında araştırma yapılıp esas\n" +
            "hakkında karar verilmesi için gerekli olan şartlardır tarafın belirtilmesi dava şartı olduğu için dava açılırken\n" +
            "davalı tarafının gösterilmesi zorunludur dava açılırken davalı taraf gösterilmemiş ise dava dilekçesi\n" +
            "reddedilir çünkü mahkemenin belirtilmemiş tarafı araştırma yükümlülüğü yoktur diğer taraftan dava\n" +
            "açılırken dava dilekçesinde birden fazla davalı veya birden fazla davacı gösterilebilir mahkemede taraflar\n" +
            "eşit hak ve yetkilere sahiptir buna medeni yargılama hukukunda silahların eşitliği denir bu eşitlik davalı ve\n" +
            "davacının mutlak anlamdaki eşitliğini değil şekli anlamdaki eşitliğini ifade eder çünkü davada tarafların\n" +
            "üstlendikleri roller nedeniyle birçok farklılık bulunur ancak hakim tarafları dinleyerek sonuca ulaşacaktır\n" +
            "çekişmeli davada dava şartı olan davalının ve davacının bulunması çekişmesiz yargı için söz konusu\n" +
            "değildir medeni yargılama hukukunun bir alt dalı olan çekişmesiz yargı karşılıklı bir uyuşmazlığın olmadığı\n" +
            "ve tarafların yer almadığı yargı türüdür bu yargı türünde taraf kavramı yerine ilgili kavramı mevcuttur\n" +
            "çekişmesiz yargılamada birden fazla ilgili bulunabilir hatta bu ilgililer farklı iddialar ve taleplerde\n" +
            "bulunabilir bu sebeple çekişmesiz yargıda talep birliği olup olmaması önemli değildir" },
    { "header": "Metin 23 (eşya kavramı)", "body": "eşya kavramı hukuk dilinde günlük dilde kullanılan eşya kavramından biraz farklılık gösterir günlük dildeki\n" +
            "kavram sıklıkla varlıkların fiziksel özelliklerini ifade etmek için kullanılırken hukukta varlıklara fiziksel\n" +
            "özelliklerinin yanında işlevsel bir anlam da yüklemektedir hukukta herhangi bir varlığın eşya olarak kabul\n" +
            "edilebilmesi için onun sadece fiziki yapısına bakılmaz aynı zamanda ekonomik toplumsal ahlaki işlevine\n" +
            "bakılır örneğin tek mısır tanesi hayvanın tek tüyü günlük hayatta fiziksel olarak eşya gibi değerlendirilebilir\n" +
            "fakat hukuken bunlar tek başına eşya olarak kabul edilmemektedir çünkü tek mısır tanesinin veya tek\n" +
            "hayvan tüyünün insanın herhangi bir ihtiyacını karşılayacak büyüklüğe ekonomik değere veya miktara\n" +
            "sahip olduğu iddia edilemez bunların üzerinde bir sanatçının çok küçük boyutlarda işlediği yazı veya resim\n" +
            "mevcutsa bu varlıklar hukuken eşya olarak kabul edilecektir bu durumda varlıklarda işlevsel bir farklılığın\n" +
            "ortaya çıktığı görülmektedir bu eşyaların sahibi kişilerin bunların sanat eserine dönüştüğünü ekonomik\n" +
            "değerlerinin arttığını veya başka eşyalarla değiş tokuş yapılabileceğini iddia edebilecekleri tahmin edilebilir\n" +
            "türk medeni kanununda sadece fiziki varlığı olan şeylerin eşya olarak kabul edileceği belirtilmiştir hukuk\n" +
            "fiziki varlığı bulunmayan ama ekonomik değeri olan şeyleri de bazı hallerde eşya gibi kabul etmektedir\n" +
            "örneğin bazı hakların eşya gibi sayıldığı ve bunların da eşyalarda olduğu gibi satış veya devir konusu\n" +
            "olabilmesi mümkündür türk medeni kanununda bir varlığın eşya sayılması için hukuki iradeye elverişli\n" +
            "olması gerektiği belirtilmiştir burada kastedilen varlığın yasaklı olmaması gerektiği ve bireysel mülkiyete\n" +
            "alınamayacak sınırları olmayan varlıkların eşya olarak sayılamayacağıdır örneğin hukuken satışı\n" +
            "yasaklanmış herhangi bir madde ülkenin doğal kaynakları gökyüzü gezegenler eşya hükmünde kabul\n" +
            "edilemez bunlar herhangi bir şekilde mülkiyete konu edilemez eşyaların kişisel olmaması kuralına göre\n" +
            "insanların vücudu organları ve cesedi eşya olarak kabul edilemez veya bunlar üzerinde herhangi bir hak\n" +
            "iddia edilemez insan vücudunun doğal bir parçası haline gelmiş takma organlar da eşya olarak kabul\n" +
            "edilemez fakat takma dişe benzer nitelikte vücuttan kolaylıkla çıkarılıp el değiştirebilecek olan protez\n" +
            "parçalar insan vücudunun parçası olarak görülmemekte ve eşya olarak sayılmaktadır eşya farklı ölçütler\n" +
            "içinde değerlendirilip farklı türlerde ele alınmaktadır" },
    { "header": "Metin 24 (normatif sistem )", "body": "normatif sistem olarak da anılan tescil sistemine göre tüzel kişiliğin kişilik kazanma anı tüzel kişinin\n" +
            "kurulması için gerekli olan koşulun yetkili makam tarafından incelenme sonrasıdır yetkili makam\n" +
            "tarafından yapılan inceleme sonucunda kuruluş şartlarının yerine getirildiğinin tespit edilmesi halinde tüzel\n" +
            "kişiliğe izin çıkar örneğin türk hukukuna göre vakıflar tescil sistemi ile kurulur tüzel kişiliği kurmak isteyen\n" +
            "kişilerin herhangi yetkili bir makamdan izin almasına gerek olmayan sistem ise serbest kuruluş sistemi\n" +
            "olarak anılır bu sistemde tüzel kişiliğin kazanılması için gerekli olan koşullar mevzuat tarafından daha\n" +
            "önceden belirlenmiştir mevzuat tarafından belirlenmiş olan koşulların yerine getirilip getirilmediği\n" +
            "herhangi bir makam kontrolünden geçmez bu sebeple serbest kuruluş sisteminde mevzuat tarafından\n" +
            "belirlenmiş koşullar yerine getirildiği anda tüzel kişilik kazanılmış olur örneğin siyasi partiler sendikalar\n" +
            "ve dernekler serbest kuruluş esasına dayanır tüzel kişiliğin kazanılma anı kadar tüzel kişiliğin sona erme\n" +
            "anı da önemlidir çünkü tüzel kişiliğin fiil ehliyetinin veya hak ehliyetinin sona ermesi ancak tüzel kişiliğin\n" +
            "son bulmasıyla mümkündür tüzel kişiliğin sonlanması tüzel kişiliğin sona erme nedenlerine göre belirlenir\n" +
            "medeni kanunun ve diğer kanunların ilgili hükümlerine göre tüzel kişiliğin sonlanması üç şekilde\n" +
            "olmaktadır bunlar kendiliğinden sona erme bir iradeyle sona erme mahkeme kararıyla sona ermedir tüzel\n" +
            "kişiliğin kanun veya kuruluş işleminde mevcut belirli nedenlerin gerçekleşmesi sonucu başka işlem veya\n" +
            "karara gerek olmadan kanun gereği sona ermesi durumunda tüzel kişilik kendiliğinden sona ermiş kabul\n" +
            "edilir infisah veya dağılma olarak ifade edilen durum genellikle tüzel kişiliğin amacını gerçekleştirmesi\n" +
            "veya tüzel kişiliğin amacını gerçekleştirmesinin imkansız hale gelmesi durumunda gerçekleşir örneğin\n" +
            "belirli süre için kurulmuş tüzel kişiler sürenin dolmasıyla kendiliğinden sona erer tüzel kişiliğin sona erme\n" +
            "sebeplerinden diğeriyse fesihtir tüzel kişiliğin iradeyle sona ermesi durumuna örnek olan bu sona erme\n" +
            "sebebinde tüzel kişilik yetkili organ veya mahkeme kararı ile sona erebilir yetkili organlardan kasıt ilgili\n" +
            "tüzel kişilerin bu konuda karar almaya yetkili organıdır tüzel kişiliği sona erdiren sebeplerden sonuncusu\n" +
            "ise mahkeme tarafından verilen karardır kanunda sayılan belirli bir nedenin ortaya çıkmasıyla tüzel kişilik\n" +
            "mahkeme kararına dayanılarak sona erdirilebilir" },
    { "header": "Metin 25(dünya üzerinde)", "body": "dünya üzerinde gerçekleşen bütün olumlu gelişmeler yalnızca insanın varlığının devam etmesine yönelik\n" +
            "etkilere sahiptir günümüzde meydana gelen gelişmelerin yeniliklerin en önemli etkisi bu unsurların insanın\n" +
            "kişiliğini geliştirmeye hizmet etmesi ve kişiliğini korumasıdır hukukta kişi hak ve borçlara sahip olabilen\n" +
            "varlıktır kişilik kavramı ise dar anlamda ve geniş anlamda olmak üzere iki farklı şekilde tanımlanmaktadır\n" +
            "dar anlamda kişilik ile kişi kavramı eş anlamlıdır geniş anlamda kişilik hak ehliyetini fiil ehliyetini kişilik\n" +
            "haklarını ve kişisel hal sicillerini kapsamaktadır kişisel haller kişinin kendine özgü bulunan onu diğer\n" +
            "insanlardan ayıran nitelikleridir örneğin kişinin erginliği medeni durumu cinsiyeti gibi unsurlar kişisel\n" +
            "haller arasında bulunan ve hukuk düzeni tarafından dikkate alınan niteliklerdir kişinin insan onuruna yaraşır\n" +
            "bir hayat sürdürebilmesinin olmazsa olmaz şartı onun maddi manevi ve ekonomik bütünlüğü ile kendi\n" +
            "varlıkları üzerinde sahip olduğu mutlak haktır kişilik hakkı parayla ölçülemeyen vazgeçilemeyen başkasına\n" +
            "devredilmeyen ve mirasçılara geçmeyen bir haktır örneğin bir kişinin şeref ve haysiyeti özgürlüğü aile içi\n" +
            "sırları fikri faaliyetleri adı şöhreti gibi unsurlar kişilik hakkı kapsamında olup başkalarına devredilemez\n" +
            "niteliktedir kişilik haklarının vazgeçilemez ve devredilemez haklar olduğu medeni kanunun ilgili\n" +
            "maddesinde kimse hak ve fiil ehliyetlerinden kısmen de olsa vazgeçemez kimse özgürlüklerinden\n" +
            "vazgeçemez veya onları hukuka ya da ahlaka aykırı olarak sınırlayamaz ifadesi ile kesin olarak belirtilmiştir\n" +
            "bahsi geçen maddede kişilik haklarının devredilemez nitelikte olduğu vurgulanmış ise de hangi unsurların\n" +
            "kişilik hakkı içerisinde yer aldığı açık bir şekilde belirtilmemiştir bu unsurların belirtilmemesinin sebebi\n" +
            "insan varlığını oluşturan ve insanın sırf insan olduğu için sahip olduğu değerleri bir bütün olarak\n" +
            "belirtmenin zor olmasıdır bir diğer sebep ise sınırsız sayıda olan kişilik haklarının kanun ile\n" +
            "sınırlandırılmasının kişilik haklarına doğrudan zarar verecek bir durum olmasıdır hukukta kişilik hakları\n" +
            "konusunda sınırlı sayı ilkesi geçerli değildir medeni kanunda sayılmamış ise de hukuk bilimciler kişilik\n" +
            "haklarını maddi haklar manevi haklar mesleki haklar ekonomik haklar gibi farklı kategorilerde\n" +
            "incelemektedir maddi haklar kişinin vücut bütünlüğüne yönelik hakları iken manevi haklar kişinin onuru\n" +
            "ve saygınlığına yönelik haklarıdır" },
    { "header": "Metin 26 (hukukta önemli)", "body": "hukukta önemli olgulardan biri hak sahibi olmak olup bunu ispat ederek ortaya çıkarabilmek aynı derecede\n" +
            "önemlidir gerçekte hak sahibi olan birçok kişinin ispat kurallarına dikkat etmemesinden kaynaklı hakkını\n" +
            "ispat edemediği bunun sonucunda mağdur olduğu çok fazla örnek bulunmaktadır dolasıyla hak kazanılırken\n" +
            "ve kullanılırken ileride durumun nasıl ispat edileceği düşünülmelidir bir hukuki uyuşmazlıkta taraflar her\n" +
            "türlü delille hakkını ispat edebilir medeni kanun bu ispat araçlarından resmi belgelere özel bir önem\n" +
            "yüklemiştir medeni kanunun ilgili maddesinde kanunda aksine bir hüküm bulunmadıkça taraflardan her\n" +
            "biri hakkını dayandırdıkları olguların varlığını ispatla yükümlüdür ifadesi ile iddia edenin ispat etmekle\n" +
            "yükümlü olduğu belirtilmiştir bir kişi birisinden alacağı olduğunu iddia ediyorsa bu durumu kişinin ispat\n" +
            "etmesi gerekmektedir borçlunun borçlu olmadığını ispat etmesi gerekmez hukuken haklı olduğunu savunan\n" +
            "ve tartışma başlatan taraf hakkının dayandığı olayları olguları ispat etmek zorundadır buna karşın diğer\n" +
            "taraf da karşı ispat hakkını kullanmakta serbesttir burada önemli olan tartışmayı başlatanın yani haklı\n" +
            "olduğunu iddia edenin ispatla yükümlü olmasıdır örneğin evlilik birliğinin temelinden sarsılması iddiasıyla\n" +
            "dava açan yani hukuken tartışmayı başlatan davacı eş bu evliliğin ne şekilde sarsıldığını ispat etmek\n" +
            "zorundadır diğer eşin evliliğin sarsılmadığını ispat etme yükümlülüğü bulunmamaktadır ancak taraflar\n" +
            "kendi iddialarını ispat etme hakkına sahiptir toplum yaşamının daha rahat ve güvenli hale gelmesi hukuk\n" +
            "kurallarıyla oldukça ilgilidir bunun için kanunlar bazı kurallara istisnalar getirerek insanların hukuki\n" +
            "ilişkilerini kolaylaştırmak ister ispat yüküyle ilgili kural iddia edenin ispat etmesi olduğu halde bazı\n" +
            "durumlarda kanun olağan genel doğruları hukuken doğru olarak varsaymaktadır hukuken doğruluğu kabul\n" +
            "edilen bu türden varsayımlara karine denir örneğin medeni kanuna göre yaş küçüklüğü akıl hastalığı akıl\n" +
            "zayıflığı sarhoşluk ya da bunlara benzer sebeplerden biriyle akla uygun biçimde davranma yeteneğinden\n" +
            "yoksun olmayan herkes kanuna göre ayırt etme gücüne sahiptir buna göre medeni kanunda sıralanan\n" +
            "durumların dışında kalan herkesin ayırt etme gücüne sahip olduğu karinesi benimsenmiştir dolayısıyla\n" +
            "birinin ayırt etme gücünün olmadığını düşünen kişi bunu ispat etmelidir" },
    { "header": "Metin 27 (kamu gücüne)", "body": "kamu gücüne ve otoritesine sahip olan çeşitli devlet kurumları ve kuruluşlarının bu otoriteye tabi kişilerle\n" +
            "veya birbirleriyle olan ilişkilerini düzenleyen hukuk kurallarına kamu hukuku denir insanların ve\n" +
            "oluşturdukları toplulukların eşit şarta ve yetkilere tabi özgür kimseler olarak kendi aralarındaki ilişkilerini\n" +
            "düzenleyen hukuk kuralları ise özel hukuk olarak tanımlanmaktadır kamu hukukunun en temel niteliği bu\n" +
            "hukuk alanına giren ilişkilerde tarafların eşit olmaması kamu yararının temsilcisi konumundaki devletin ve\n" +
            "diğer kamu tüzel kişilerinin üstün konumda bulunmasıdır bu konumları onlara tek taraflı olarak ilişkinin\n" +
            "kapsamını ve içeriğini belirleme imkanı vermektedir özel hukuku karma hukuk ve kamu hukukundan\n" +
            "ayrıştıran en önemli özellik bu alandaki hukuk ilişkilerinin eşitlik ve irade serbestisi ilkesine dayanmasıdır\n" +
            "hukukta asıl olan bireylerin özgürlüklerinin ve haklarının güvence altına alınmasıdır kamu hukuku özel\n" +
            "hukukun hizmetinde ve onun üzerinde koruyucu olmalıdır tarihsel açıdan bakıldığında anayasa hukuku\n" +
            "idare hukuku ve ceza hukukunun da birey hak ve özgürlüklerini korumak üzere geliştirildikleri\n" +
            "görülmektedir anayasal metinler yöneticilerin siviller üzerindeki baskılarını sınırlandırma bunu en aza\n" +
            "indirme mücadelelerinin sonucudur aslında kamu hukukunun da karma hukukun ve özel hukukun da asıl\n" +
            "gayesi birey hak ve özgürlüklerini korumaktır günümüzde özel hukuk ve kamu hukuku bundan dolayı\n" +
            "gittikçe birbirine daha çok yaklaşmaktadır fakat bu açıdan bakılsa da gerek kamu hukukunun gerekse karma\n" +
            "hukukun ve bunların alt dallarının özel hukuktan ayrılmış başlı başına birer hukuk dalı olduğu\n" +
            "görülmektedir kişilerin birbirleriyle olan ilişkilerini eşitlik ve irade serbestisi ilkesi doğrultusunda\n" +
            "düzenleyen özel hukuk kuralları konuları ve özellikleri itibarıyla birbirinden oldukça farklıdır yıllar\n" +
            "içerisinde toplumsal hayatta iletişimde teknolojide meydana gelen değişimler birçok yeni hukuki\n" +
            "problemleri de beraberinde getirmiştir bu karmaşık hukuk ilişkilerini sadece özel hukuk olarak tanımlamak\n" +
            "yetersiz kalmaya başlamıştır özel hukuk bir üst kavram olarak kalması şartıyla kendi içinde çeşitli dallara\n" +
            "ayrılmıştır örneğin daha öncesinde medeni hukukun parçası olan borçlar hukuku şimdilerde başlı başına\n" +
            "hukukun dalı haline gelmiştir önceden özel hukuk içinde sayılan fikir hukuku artık karma hukuk içinde\n" +
            "sayılmaktadır özel hukukun alt dalları farklı kaynaklarda farklı şekilde sayılabilmektedir" },
    { "header": "Metin 28(bilgi akışını)", "body": "bilgi akışını sağlayan yazılı sesli veya görsel araçlara kitle iletişim araçları denir bu akış bireyden çoğula\n" +
            "veya çoğuldan bireye doğrudur kitle iletişim araçlarının belirleyici özelliği bir mesajı aynı anda çok sayıda\n" +
            "kişiye ulaştırmasıdır ülkemizde sıklıkla kullanılan kitle iletişim araçlarının başında televizyon gelir\n" +
            "televizyonun hemen hemen herkesin evinde bulunması ücretsiz olması ve her kitleye hitap etmesi bunun\n" +
            "ana nedenleri arasındadır herhangi bir toplumsal sorunun çözümünde toplumun geneline ulaşmak onları\n" +
            "mevcut sorun hakkında yüz yüze bilgilendirmek oldukça zordur ancak kitle iletişim araçlarını kullanarak\n" +
            "çok sayıda insana ulaşmak onları bilgilendirmek ve onların görüşlerini almak daha kolaydır kitle iletişim\n" +
            "araçları bu kolaylığının yanı sıra kitleyi olumsuz etkileme ve yönlendirme gibi özelliklere de sahiptir kitle\n" +
            "iletişim araçları yapısal özellikleri nedeniyle farklı kitleler tarafından tercih edilmektedir örneğin gazete tek\n" +
            "başına ve tüketicinin genel veya özel düşünceleri duyguları ve davranışlarında ölçü olarak değerlendirdiği\n" +
            "gruplara danışılmadan hızlı okunan kitle iletişim aracıdır gazete günlük haberleri gelişmeleri öğrenmek için\n" +
            "alınır gazetenin bir kere okunması yeterlidir ancak anlaşılmayan konular olunca tekrar okuma şansı vardır\n" +
            "dergi evlerde iş yerlerinde bir haftadan daha uzun süre durabilir dergi birkaç kere okunabilir çünkü dergide\n" +
            "yazılanlar defalarca okunabilir ve referans gruplarıyla tartışılabilir dergiler özellikle belli konularda ayrıntılı\n" +
            "araştırmaları içerdiği için başvuru aracı olarak kullanılabilir radyo ise gazete ve dergiden çok daha farklı\n" +
            "bir kitle iletişim aracıdır radyoda sade açık ve tekrarlanan bir metin ses yoluyla kitleye ulaştırılır metnin\n" +
            "içeriği ve ses tonlaması gibi özellikler kitle üzerinde etkili rol oynar ama sesli iletilerin hızlı unutulma\n" +
            "riskleri vardır televizyonda hareketli görüntü ve ses vardır ancak televizyon görüntüsü yanılsamadır\n" +
            "gerçekte görüntü yoktur küçük noktaların yoğunluklarıyla oluşan resim insan zihninde önceden tanımlanan\n" +
            "bilgilerle çakıştırılır ve bu bilgiler algılanıp anlam kazanır yarım görüntülerin diğer yarısını zihin tamamlar\n" +
            "zihin mekanik olarak çalışır ancak gazete okurken olduğu gibi kod çözmeyle uğraşmaz eskiden izleyicinin\n" +
            "anında çözümleme yapması gerekirken yeni teknoloji ile artık televizyon yayınları internet üzerinden\n" +
            "izlenip kayıt edilebilmektedir" },
    { "header": "Metin 29 (ayırt etme) ", "body": "ayırt etme gücüne sahip ve ergin olup kısıtlı olmayan kişiler tam ehliyetliler grubuna girer tam ehliyetliler\n" +
            "hiçbir izne gerek olmaksızın kendi iradeleriyle hukuki işlemleri gerçekleştirebilirler borç altına girebilirler\n" +
            "yaptıkları hukuka aykırı hareketlerden de sorumlu olacaklardır kendi haklarını korumak için dava\n" +
            "açabilirler ayırt etme gücüne sahip olmayan herkes tam ehliyetsizdir ayırt etme gücüne sahip olmayan\n" +
            "kişinin kısıtlı olup olmadığına veya ergin olup olmadığına bakılmaksızın tam ehliyetsiz olduğu söylenebilir\n" +
            "doğruyla yanlışı ayırt edebilecek zeka seviyesine sahip olmayan kişilere üç yaşındaki çocuk veya elli\n" +
            "yaşındaki akıl hastası örnek olarak verilebilir tam ehliyetsizler fiil ehliyetine sahip değillerdir tam ehliyetsiz\n" +
            "kişiler ayırt etme gücüne sahip olmadıklarından dolayı evlenemezler ayrıca tam ehliyetsizler hukuki işlem\n" +
            "yapamazlar bu yaptıkları hukuki işlem geçersiz sayılır bu kişilerin hukuki işlemlerini anne babası veya ayırt\n" +
            "etme gücü olmayanlara hukuki işlemlerde onları temsil etmek ve menfaatlerini korumak için mahkeme\n" +
            "tarafından atanan yasal temsilciler yürütür ancak mahkemece atanan vasiler tam ehliyetsiz kişiler adına bazı\n" +
            "hukuki işlemleri yapamazlar bu işlemlere örnek vermek gerekirse kefil olmak vakıf kurmak ve bağış\n" +
            "yapmaktır tam ehliyetsiz sayılan akıl hastaları başkalarının malına verdiği zarardan sorumlu olmazlar\n" +
            "yaptıklarından dolayı bu kişilere ceza verilemez ancak akıl hastalarının kusursuz sorumluluğu söz konusu\n" +
            "olabilir yani başkalarının malına zarar veren akıl hastasının ekonomik durumunun iyi olması halinde\n" +
            "mahkeme tarafından sebep olduğu zararları ödemesine hükmedilebilir ancak ceza verilemez normalde tam\n" +
            "ehliyetliler bazen dış etkenlerle tam ehliyetsiz hale gelebilir buna sarhoşluk örnek verilebilir kişi sarhoşken\n" +
            "ayırt etme gücüne sahip olmayacağından dolayı tam ehliyetsizdir iradeleriyle sarhoş olan kişiler ayırt etme\n" +
            "gücüne sahip olmasalar bile yaptıkları hukuka aykırı eylemlerden dolayı sorumludurlar örneğin kişi kendi\n" +
            "iradesiyle sarhoş olup başkasının arabasına zarar vermesi halinde hem ceza almak hem de verdiği zararın\n" +
            "karşılığını ödemek zorunda kalır kişi kendi iradesi dışında sarhoş olduğunu ispatlarsa ceza yaptırımı\n" +
            "uygulanmaz sınırlı ehliyetli tam ehliyetli şartlarını taşıdığı halde ehliyeti sınırlanan kimsedir ayırt etme\n" +
            "gücüne sahip ve ergin olup kısıtlı olmayan kişiler yani tam ehliyetli şartlarını taşıyıp da kendilerine yasal\n" +
            "danışman atanan kişilerdir" },
    { "header": "Metin 30 (hak kavramı hukukla) ", "body": "hak kavramı hukukla ilgili temel kavramlardan biridir adalet ve hukuka uygunluk anlamlarına gelen hak\n" +
            "kelimesi arapça hukuk kelimesinin tekil halidir verilmiş bir emekten dolayı maddi ve manevi yetkidir hak\n" +
            "yasalar ve anlaşmaların insana tanıdığı yetkilerin toplamıdır kişiler haklarını kullanıp kullanmama iradesine\n" +
            "sahiptirler bir hakkın kullanımı ise medeni kanunda belirtildiği üzere dürüstlük ilkesi dahilinde olmalıdır\n" +
            "hak sahipleri özel veya tüzel kişiler olabilir sağ olarak doğmak koşuluyla ana rahmine ilk düştüğü andan\n" +
            "itibaren insanlar hak ehliyetini kazanırlar haklar kanunlarla düzenlenerek koruma altına alınırlar haklar\n" +
            "aslında hukuk kurallarına dayanır toplum içinde yaşayan herkesin üstlenmesi gereken belli başlı rolleri\n" +
            "bulunur aynı zamanda devletler ve uluslararası kuruluşlar tarafından güvence altına alınan haklar da\n" +
            "bulunmaktadır din ve vicdan hürriyeti düşünce hürriyeti özel hayatın gizliliği hakları sahip olduğumuz\n" +
            "haklardandır kişilerin hukuk düzeni tarafından korunan menfaatlerini ifade eden hak kavramı hukuk\n" +
            "kavramı ile birleşiktir bilimsel bir disiplin sistemi olarak hukuk kişiler arası ilişkileri kişiler ile devlet veya\n" +
            "devleti oluşturan kurumlar arası ilişkileri ve devlet ile devletler arası ilişkileri düzenleyen kurallar\n" +
            "bütünüdür hukuk kişilere yetki verebileceği gibi yaptırım da uygulayabilir ceza yaptırımı yasaya ve kurala\n" +
            "aykırı davranılması halinde hukuk düzenince öngörülen sonuçtur yaptırımın amacı ise kişilerin hukuka\n" +
            "uygun davranmasını sağlamak ve toplumsal düzene aykırı davranışın meydana getirdiği olumsuz sonuçları\n" +
            "önlemektir örneğin trafikte kırmızı ışıkta durması gereken bir aracın yoluna devam etmesi halinde aracı\n" +
            "kullanan kişiye ve araç sahibine trafik cezası yaptırımı uygulanması borcunu zamanında ödemeyen kişinin\n" +
            "malına hukuki yollarla el konularak alacaklıya hakkın verilmesi bir mala zarar veren kişiye bu malın\n" +
            "değerinin ödettirilmesi gibi hukuk sisteminin en önemli özelliği yasaların açık anlaşılır ve kesin olmasıdır\n" +
            "yazının icat edilmesinden sonra bütün yasalar yazılı hale getirilmiştir yasal kurallar sistemli şekilde\n" +
            "toplanmış açıklık ve kesinlik kazanarak kolayca başvurulacak kaynak haline getirilmiştir hukuk gelişirken\n" +
            "birtakım esaslar üzerinde durulur bütün hukuk kurallarının amacı kendine yapılmasını istemediğin bir şeyi\n" +
            "başkasına da yapmamak üzerine kuruludur zaten insanlar huzur ve güven içinde yaşamak için hukuka\n" +
            "ihtiyaç duymuşlardır ve hukuk herkes için vardır" }

];
