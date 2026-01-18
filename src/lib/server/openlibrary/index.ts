import ky from 'ky';

interface OpenLibrarySearchResponse {
	numFound: number;
	start: number;
	numFoundExact: boolean;
	num_found: number;
	documentation_url: string;
	q: string;
	offset: number | null;
	docs: OpenLibraryDoc[];
}

interface OpenLibraryDoc {
	author_key: string[];
	author_name: string[];
	cover_edition_key?: string;
	cover_i?: number;
	ebook_access: 'borrowable' | 'printdisabled' | 'public' | 'no_ebook' | 'unknown';
	edition_count: number;
	first_publish_year: number;
	has_fulltext: boolean;
	ia: string[];
	ia_collection: string[];
	key: string;
	language: string[];
	lending_edition_s?: string;
	lending_identifier_s?: string;
	public_scan_b: boolean;
	title: string;
}

/**
 * The Open Library Search API is one of the most convenient and complete ways to retrieve book data on Open Library. The API:
 * 1. Is able to return data for multiple books in a single request/response
 * 2. Returns both Work level information about the book (like author info, first publish year, etc), as well as Edition level information (like title, identifiers, covers, etc)
 * 3. Author IDs are returned which you can use to fetch the author's image, if available
 * 4. Options are available to return Book Availability along with the response.
 * 5. Powerful sorting options are available, such as star ratings, publication date, and number of editions.
 * @param query - The search query string.
 */
export async function search(query: string, limit: number = 1): Promise<OpenLibrarySearchResponse> {
	let response = await ky.get(
		`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}`
	);
	let data: OpenLibrarySearchResponse = await response.json();

	return data;
}

interface OpenLibraryWorkResponse {
	title: string;
	key: string;
	authors: {
		author: { key: string };
		type: { key: string };
	}[];
	type: { key: string };
	description?: string;
	covers?: number[];
	subject_places?: string[];
	subjects?: string[];
	subject_people?: string[];
	subject_times?: string[];
	location?: string;
	latest_revision: number;
	revision: number;
	created: {
		type: string;
		value: string;
	};
	last_modified: {
		type: string;
		value: string;
	};
}

/**
 * A Work is a logical collection of similar Editions. "Fantastic Mr. Fox" could be a Work which contains a Spanish translation edition, or perhaps a 2nd edition which has an additional chapter or corrections. Work metadata will include general umbrella information about a book, whereas an Edition will have a publisher, an ISBN, a book-jacket, and other specific information.
 * @param olid - The Open Library ID of the work.
 */
export async function work(olid: string): Promise<OpenLibraryWorkResponse> {
	let response = await ky.get(`https://openlibrary.org/works/${encodeURIComponent(olid)}.json`);
	let data: OpenLibraryWorkResponse = await response.json();
	return data;
}

/**
 * Provides a programmatic method to access the book covers and author photos available in the Open Library Covers Repository.
 * @param key - can be any one of ISBN, OCLC, LCCN, OLID and ID (case-insensitive)
 * @param value - is the value of the chosen key
 * @param size - can be one of S, M and L for small, medium and large respectively.
 * @returns
 */
export async function cover(
	key: 'olid' | 'isbn' | 'oclc' | 'lccn' | 'id',
	value: string,
	size: 'S' | 'M' | 'L'
): Promise<Blob> {
	let response = await ky.get(
		`https://covers.openlibrary.org/b/${encodeURIComponent(key)}/${encodeURIComponent(value)}-${encodeURIComponent(size)}.jpg`
	);
	let data = await response.blob();

	return data;
}
