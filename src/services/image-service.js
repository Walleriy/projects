export default class ImageService {

    _apiBase = 'https://starwars-visualguide.com/assets/img/'

    getImage = (item) => {
        const typeRegExp = /(?<=http:\/\/swapi\.dev\/api\/)\w*/;

        let itemType = item.url.match(typeRegExp)[0];
        switch (itemType) {
            case 'people':
                itemType = 'characters'
                break
        }

        const IDRegExp = /(?<=http:\/\/swapi\.dev\/api\/\w*)\/\d/;
        const itemID = item.url.match(IDRegExp)[0];

        let res = `${this._apiBase}${itemType}/${itemID}.jpg`
        return res;
    }

}