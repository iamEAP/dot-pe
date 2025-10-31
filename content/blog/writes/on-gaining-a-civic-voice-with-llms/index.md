---
title: Gaining a Civic Voice with Large Language Models
date: "2025-08-05T17:30:00+02:00"
description: Parlaying high-level language comprehension into production
thumbnail: civic-voice-with-llms.jpg
langKey: en
isTranslated: true
---

It's the year 2025 and it's a strange time to be a knowledge worker. Zoomed all the way out, you see investors and the world's largest technology companies collectively burning a trillion+ dollars on the LLM-fueled hunt for productivity gains, aimed at upending the global economy as we know it. Zoomed all the way in, you see LLMs regularly struggle to turn their finely-tuned, probabilistic semantic mappings into even the most basic, durable value.

While the jury is still out on macroeconomic revolution, there's at least broad consensus that there's a _there_ there; we are just collectively, through socio-technical coercion, in the phase of finding the contours of that value.

I remain skeptical of the overall impact the AI boom will have on my profession, but I've at least been able to derive personal value via an increased ability to challenge power structures in my adoptive country. Let me explain.

## Asymmetric language proficiency

For a variety of well-documented structural reasons (which can be boiled down to exceptional English fluency), it's comparatively easy for English-speaking immigrants to get settled in Sweden, but significantly more difficult for them to organically progress at Swedish language acquisition. A pronounced, asymmetric proficiency between production and comprehension of Swedish is common.

Even after 5 years here, the relatively few opportunities I have to produce Swedish (both written and oral) leave me at a stress-free-but-still-basic level (perhaps B1 on the CEFR scale). By contrast, I consume a significant amount of Swedish media which, over time, has led to proportionally higher levels of reading and listening comprehension (closer to a C1 level).

And the media I consume is disheartening: like most European countries, Sweden finds itself enmeshed in a wave of anti-immigration and xenophobia. Sweden's minority, "pro-business" center-right government coalition finds itself wholly dependent on a larger, far-right anti-immigrant party, regularly putting it [in ironic conflict with pro-business interests](https://www.svt.se/nyheter/lokalt/orebro/svenskt-naringsliv-kritiskt-till-nya-lonegolvet-for-arbetskraftsinvandrare--fylha5). They're also pushing through [legislation](https://www.svd.se/a/MnV9b5/johan-forssell-vill-man-bli-svensk-medborgare-ska-man-kunna-forsorja-sig-sjalv) that directly and negatively impacts me, my colleagues and (I believe by extension) the economy at large.

Although my B1-level Swedish production prevents me from effectively engaging with these issues in any meaningful way, LLMs enable me to parlay my C1-level comprehension into C1-level writing. Who would've thought that a product whose founding research was, for decades, motivated by and benchmarked on translation, would excel at translation tasks?

By drafting content in my native language first, then translating interactively with an LLM, I've reached audiences I would never have imagined possible: including [editorial pieces in a Big 3 Swedish newspaper](https://www.svd.se/a/OoVRoV/sverige-skrammer-bort-kvalificerad-arbetskraft-skriver-eric-peterson), as well as [a formal response to the government itself](../a-response-to-sou-2025-1).

## LLMs and translation in practice

If you find yourself in a similar situation, I've collected a few notes on how to leverage LLMs for translation in the context of civic engagement (or, generally!).

#### Use the right model for the job

AI companies these days are iterating very rapidly on their foundational models, often releasing multiple models that are (at least marketed to be) specialized for different types and levels of tasks. Be sure you're using a model that's up to the task; try several. In my experience, the difference in quality of output is stark and immediately noticeable.

#### Context is king, and it's your responsibility to provide it

While modern models can perform web searches before providing an initial response, you'll get better results if you do the research and provide the model with that context yourself: everything from mundane details like document structure, formatting, and length, to your intended audience and their motivations, as well as your own goals, purpose, and tone. Every detail, even if you're repeating information embedded in the structure of your original document, helps tune the model toward a more ideal output.

In more formal contexts, or where you want specific terms to be used in the translation, it can also be helpful to provide a short glossary as part of your context (e.g. specifying how "concur" or "reject" should be translated, or mirroring vocabulary used in source documents or statements, e.g. to delineate between colloquial and legal terms used for "residency," etc).

#### Guide away from a tendency toward direct translation

I don't know if it's an artifact of the linguistic relationship between English and Swedish, or of the training data used by the models I was working with, but I found that, even with explicit instructions to prefer idiomatic structures and vocabulary, initial outputs would often include stilted clauses that mapped nearly 1:1 to the source material.

You'll need to lean on your familiarity with the target language to identify unnatural sounding output and guide the model toward more natural constructions.

#### Mistranslations happen, regularly even

While it's exceedingly rare for a model to output grammatically incorrect translations, I've found the majority of my time, especially in the beginning of the process, is spent identifying plausible-sounding but just plain inaccurate translations.

Iterate in phases: first read carefully and identify and work to resolve mistranslations, then focus on clarity and flow. You're playing the role of a translation editor where your biggest strength is that you also authored the original document, but where your biggest limitation is your grasp of the target language.

#### Batch feedback, apply fixes manually

Before iterating, I find it best to copy the initial translation into a separate document where I can manually apply changes (and track/revert changes if necessary). As your session goes on, the quality of the output tends to deteriorate, so it's best to keep yourself in the loop and in control of the final product.

When you iterate with the model, batch your feedback: for example, in your responses, number each of the questions or points you want to make related to the translation. Depending on the company/product/model, it may go into an editing mode where it makes direct changes, or it may respond point-by-point. Evaluate each of the proposed changes and apply them manually to your document as you see fit.

#### Evaluation step

After you've accumulated edits and feel satisfied with your translation, I find it helpful to feed the translation back into the model (in a new session), asking it to evaluate the translated document on its own merits in the context of your goals: is it likely to be well-received by your intended audience, does it have the tone you're going for, etc., and if not, ask for suggestions to remediate.

For particularly important or sensitive documents, you should pass your document by a trusted native speaker (ideally, an editor).

## There are no shortcuts

LLMs are not magic. The outputs they produce can be no better than the input, context, and guidance they are provided. I don't think I would have been as successful without extensive drafting and editing in my native language. A fairly high-level of Swedish comprehension was also critical (LLMs are no substitute for language learning).

Even still, the value is clear: I was able to get my voice and ideas into the public discourse. Hopefully this inspires others in similar situations to have their voice heard.
