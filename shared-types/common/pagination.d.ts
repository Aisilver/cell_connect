export type Pagination = {
    limit: number,
    page: number
}

export type PaginatedData<Item = unknown> = {
    data: Item[],
    numberOfPagesLeft: number,
    unitsLeft: number,
} & Pagination