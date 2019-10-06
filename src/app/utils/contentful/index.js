import * as contentful from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

const client = contentful.createClient({
    space      : "421w0fsh4dri",
    accessToken: "7HOOTT94pK3MmaosD5X6_ypZiw1tfRIDg1XTmI-BDJY",
});

export async function getAllEntries() {
    const contentfulDataRaw = await client.getEntries();
    const contentfulData = await contentfulDataRaw.items.map(e => {
        return {
            title      : e.fields.title,
            thumbnail  : e.fields.thumbnail.fields.file.url,
            pubDate    : e.fields.pub_date,
            description: e.fields.description,
            guid       : e.sys.id,
            type       : "contentful",
        };
    });

    return contentfulData;
}

export async function getEntry(guid) {
    try {
        const entryId = guid.slice(8);
        const entryRaw = await client.getEntry(entryId);
        const entry = {
            title      : entryRaw.fields.title,
            author     : "FUHCM.com",
            categories : entryRaw.fields.tags,
            content    : documentToHtmlString(entryRaw.fields.body),
            description: entryRaw.fields.description,
            guid       : null,
            link       : null,
            pubDate    : null,
            thumbnail  : entryRaw.fields.thumbnail.fields.file.url,
        };

        return entry;
    } catch (err) {
        throw err;
    }
}
