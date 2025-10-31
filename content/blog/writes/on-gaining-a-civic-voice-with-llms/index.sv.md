---
title: Att få en röst i samhällsdebatten med LLM:er
date: "2025-08-05T17:30:00+02:00"
description: Från språkförståelse till språkbruk
thumbnail: civic-voice-with-llms.jpg
langKey: sv
isTranslated: true
---

Det är 2025 och det är en märklig tid att vara kunskapsarbetare. I det stora perspektivet ser man investerare och världens största techbolag bränna över en biljon dollar i jakten på produktivitetsvinster med LLM:er—med ambitionen att rita om den globala ekonomin. Zoomar man in ser man samtidigt hur LLM:er ofta har svårt att omvandla sina finjusterade språkmodeller till något som faktiskt håller värde över tid, ens i det lilla.

Om den stora makroekonomiska omvälvningen uteblir eller ej återstår att se. Men de flesta kan åtminstone enas om att det _finns_ något där; vi är, genom ett visst sociotekniskt tryck, mitt uppe i att rita kartan över var det värdet faktiskt ligger.

Jag är fortsatt skeptisk till vilken effekt AI-boomen kommer ha på min yrkesroll. Däremot har jag lyckats få ut personligt värde—framför allt genom att lättare kunna utmana maktstrukturer i mitt nya hemland. Låt mig förklara.

## Asymmetrisk språkkompetens

Av välkända, strukturella skäl (som i praktiken kokar ned till att svenskar är exceptionellt bra på engelska) är det för engelskspråkiga invandrare relativt lätt att etablera sig i Sverige, men betydligt svårare att utveckla sin svenska på ett naturligt sätt--eftersom svenskar så ofta byter till engelska för att underlätta samtalet. En påtaglig asymmetri mellan produktion och förståelse av svenska är vanlig.

Även efter fem år här har jag, på grund av få tillfällen att producera svenska (både skriftligt och muntligt), fastnat på en okomplicerad men ganska grund nivå—kanske kring B1 enligt CEFR/GERS. Däremot konsumerar jag mycket svenskspråkig media, vilket över tid gett mig betydligt bättre läs- och hörförståelse (snarare C1-nivå).

Och den mediekonsumtionen är nedslående: som i många europeiska länder präglas debatten i Sverige av stark migrationskritik och tilltagande xenofobi. Den mindre center-högra regeringskoalitionen är helt beroende av ett större, invandringskritiskt högerparti, vilket inte sällan sätter den [i ironisk konflikt med näringslivets intressen](https://www.svt.se/nyheter/lokalt/orebro/svenskt-naringsliv-kritiskt-till-nya-lonegolvet-for-arbetskraftsinvandrare--fylha5). Samtidigt drivs [lagstiftning](https://www.svd.se/a/MnV9b5/johan-forssell-vill-man-bli-svensk-medborgare-ska-man-kunna-forsorja-sig-sjalv) igenom som direkt påverkar mig, mina kollegor och—tror jag—ekonomin i stort.

Mitt B1-mässiga svenska skrivande hindrar mig från att delta effektivt i den här debatten. LLM:er låter mig däremot omsätta min C1-förståelse till C1-skrivande. Vem kunde ana att en teknik vars grundforskning i decennier drevs av och mättes på översättning skulle bli... riktigt bra på översättning?

Genom att först skriva på mitt modersmål och sedan översätta iterativt med en LLM har jag nått målgrupper jag aldrig trodde var möjliga: från [debattartiklar i en av de tre stora rikstäckande dagstidningarna](https://www.svd.se/a/OoVRoV/sverige-skrammer-bort-kvalificerad-arbetskraft-skriver-eric-peterson) till [ett formellt svar till regeringen](../a-response-to-sou-2025-1).

## LLM:er och översättning i praktiken

Om du känner igen dig kommer här några erfarenheter om hur man kan använda LLM:er för översättning i samhällsengagemang (och i allmänhet).

#### Välj rätt modell för uppgiften

AI-bolag släpper just nu nya grundmodeller i rasande takt—ofta flera varianter som sägs vara specialiserade för olika typer av uppgifter. Se till att använda en modell som faktiskt håller måttet; testa flera. I min erfarenhet är kvalitetsskillnaderna tydliga och märks direkt.

#### Kontext är kung—och det är du som måste stå för den

Många moderna modeller kan göra webbsökningar innan de svarar. Resultatet blir ändå bättre om du gör förarbetet och matar modellen med kontext: allt från dokumentstruktur, format och längd till målgrupp och deras drivkrafter, samt dina egna mål, syfte och tonläge. Varje detalj, även sådant som redan "finns" i källtextens upplägg, hjälper modellen mot ett mer träffsäkert resultat.

I mer formella sammanhang, eller när specifika termer ska användas, är en kort ordlista också värdefull (t.ex. hur "instämma" respektive "avstyrka" ska återges, eller hur begrepp i myndighetstexter ska speglas—exempelvis skillnaden mellan vardagliga och juridiska termer för "hemvisttid" etc).

#### Styr bort från raka översättningar

Om det beror på släktskapet mellan engelska och svenska, eller på träningsdatan, vet jag inte. Men trots tydliga instruktioner om att prioritera idiomatiska uttryck och naturlig svenska får man ofta en första version där formuleringar mappas nästan 1:1 mot originalet—styltigt och onödigt engelskklingande.

Här måste du luta dig mot din känsla för målspråket: identifiera det som skaver och styra modellen mot mer naturliga konstruktioner.

#### Felöversättningar händer—ofta

Grammatiska fel är ovanliga. Däremot går mycket tid i början åt till att hitta översättningar som låter rimliga men i sak blir fel.

Jobba i faser: läs först noggrant igenom texten och rätta rena felöversättningar; fokusera sedan på tydlighet och flyt. Du agerar översättningsredaktör—med styrkan att du själv skrivit originalet, men med begränsningen att din svenska inte är helt trygg.

#### Bunta feedback—tillämpa ändringar manuellt

Innan du itererar vidare kopierar du första översättningen till ett separat dokument där du gör ändringar för hand (gärna med spårning så att du kan backa). Kvaliteten tenderar att sjunka ju längre en chatt pågår, så håll dig själv i loopen och i kontroll över slutprodukten.

När du ger modellen feedback: samla ihop den. Numrera dina frågor och punkter. Beroende på verktyg kan modellen gå in i ett "redigeringsläge" eller svara punkt för punkt. Utvärdera varje förslag och för in det manuellt i din arbetskopia.

#### Lägg in en utvärderingsrunda

När du samlat ihop dina ändringar och känner dig nöjd, mata in översättningen i en ny session och be modellen utvärdera texten på egna meriter utifrån dina mål: kommer den sannolikt tas emot väl av målgruppen, har den rätt ton, och om inte—vilka justeringar behövs?

Är texten extra viktig eller känslig bör en pålitlig modersmålstalare (gärna en redaktör) läsa den.

## Inga genvägar

LLM:er är inte magi. Resultatet blir aldrig bättre än det underlag, den kontext och den styrning de får. Jag tvivlar på att jag hade lyckats utan grundlig idéskiss och redigering på mitt modersmål. En ganska hög nivå av svensk läsförståelse var också avgörande (LLM:er ersätter inte språkinlärning).

Trots det är nyttan tydlig: jag kunde få in min röst och mina idéer i det offentliga samtalet. Förhoppningen är att fler i liknande situationer gör detsamma—och låter sin röst höras.
