import { readFileSync } from "fs"
interface IImportable {
    loadPlaylist(path: string)
}

class Artist {
    private _name: string
    private _albums: Album[]

    setName(name:string) {
        this._name = name
    }

    constructor(name:string) {
        this.setName(name)
    }

    addAlbum(album: Album) {
        this._albums.push(album)
    }
}

class Album {
    private _title: string
    private _artist: Artist
    private _year: number
    private _tracks: Song[]

    setTitle(title: string) {
        this._title = title
    }

    setArtist(artist: Artist) {
        this._artist = artist
    }

    setYear(year: number) {
        this._year = year
    }

    get title():string {
        return this._title
    }

    get tracks(): Song[] {
        return this._tracks
    }

    constructor (title: string, artist: Artist, year: number) {
        this.setTitle(title)
        this.setArtist(artist)
        this.setYear(year)

    }

    addTrack(track: Song) {
        this._tracks.push(track)
    }
}

class Song {
    private _title: string

    setTitle(name: string) {
        this._title = name
    }

    get songTitle(): string {
        return this._title
    }

    constructor (title: string) {
        this.setTitle(title)
    }
}

class Playlist {
    private _name: string
    private _tracks: Song[]

    setName(name: string) {
        this._name = name
    }

    setList(songs: Song[]) {
        this._tracks = songs
    }

    get name(): string {
        return this._name
    }

    get songList(): Song[] {
        return this._tracks
    }

    constructor (name: string, songList: Song[]) {
        this.setName(name)
        this.setList(songList)
    }

    addAlbum(album: Album) {
        album.tracks.forEach(track => this._tracks.push(track))
    }
}

class LocalImporter implements IImportable{
    private _path: string
    
    constructor(path: string) {
        this._path = path
    }

    loadPlaylist() {
        let playlist = JSON.parse(
            readFileSync(this._path, {encoding: "utf8"})
        )
            return playlist
    }
}

class CloudImporter implements IImportable{
    private _path: string = "cloudDatabase.json"
    private _host: string

    constructor(host: string) {
        this._host = host
    }

    loadPlaylist() {
        let playlist = JSON.parse(
            readFileSync(this._path, {encoding: "utf8"})
        )
            return playlist
            console.log(`importing playlist from ${this._host}`)
    }
}

class PlaylistImporter {
    private _importer: IImportable

    constructor(importer: IImportable) {
        this._importer = importer
    }

    importPlaylist(): Playlist {
        return this._importer.loadPlaylist()
    }
}

class User {
    private _username: string
    private _password: string
    private _playlists: Playlist[]
    private _albums: Album[]

    setUserName(uName: string) {
        this._username = uName
    }

    setPassword(pWord: string) {
        this._password = pWord
    }

    get username():string {
        return this._username
    } 

    get password(): string {
        return this._password
    }

    constructor(username: string, password: string) {
        this.setUserName(username)
        this.setPassword(password)
    }

    addPlaylist(playlist: Playlist) {
        this._playlists.push(playlist)
    }

    addAlbum(album: Album) {
        this._albums.push(album)
    }

    get songs(): Song[] {
        let songList: Song[] = []
        this._albums.forEach(album => {
            album.tracks.forEach(song => {
                songList.push(song)
            })
        })
        return songList
    }

    get albums(): Album[] {
        return this._albums
    }

    get playlists(): Playlist[] {
        return this._playlists
    }
}