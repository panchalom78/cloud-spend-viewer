/**
 * Pagination Component
 *
 * Navigation controls for paginated data tables.
 * Provides previous/next buttons, page number navigation, and page info.
 *
 * @component
 * @example
 * // Basic pagination
 * <Pagination
 *   page={currentPage}
 *   setPage={setCurrentPage}
 *   limit={itemsPerPage}
 *   setLimit={setItemsPerPage}
 *   meta={paginationMeta}
 *   loading={isLoading}
 * />
 */

/**
 * Pagination navigation component.
 *
 * @component
 * @param {Object} props
 * @param {number} props.page - Current page number
 * @param {Function} props.setPage - Page setter function
 * @param {number} props.limit - Items per page
 * @param {Function} props.setLimit - Limit setter function
 * @param {Object} [props.meta] - Pagination metadata from API
 * @param {boolean} props.loading - Loading state to disable controls
 *
 * @example
 * // With API metadata
 * <Pagination
 *   page={1}
 *   setPage={handlePageChange}
 *   limit={10}
 *   setLimit={handleLimitChange}
 *   meta={apiResponse.meta}
 *   loading={false}
 * />
 */
function Pagination({ page, setPage, limit, setLimit, meta, loading }) {
    return (
        <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-sm text-gray-700">
                    Showing page {meta ? meta.page : page} of{" "}
                    {meta ? meta.totalPages : "?"}
                    {meta && meta.totalItems && (
                        <span className="ml-1">
                            ({meta.totalItems} total records)
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {/* Previous Page Button */}
                    <button
                        className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={
                            meta
                                ? meta.page <= 1 || loading
                                : page <= 1 || loading
                        }
                        aria-label="Previous page"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Previous
                    </button>

                    {/* Page Number Buttons */}
                    {meta && meta.totalPages > 1 && (
                        <div className="hidden sm:flex items-center gap-1">
                            {Array.from(
                                { length: Math.min(5, meta.totalPages) },
                                (_, i) => {
                                    let pageNum;
                                    if (meta.totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (meta.page <= 3) {
                                        pageNum = i + 1;
                                    } else if (
                                        meta.page >=
                                        meta.totalPages - 2
                                    ) {
                                        pageNum = meta.totalPages - 4 + i;
                                    } else {
                                        pageNum = meta.page - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                                meta.page === pageNum
                                                    ? "bg-blue-600 text-white"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            } transition-colors`}
                                            onClick={() => setPage(pageNum)}
                                            disabled={loading}
                                            aria-label={`Go to page ${pageNum}`}
                                            aria-current={
                                                meta.page === pageNum
                                                    ? "page"
                                                    : undefined
                                            }
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    )}

                    {/* Next Page Button */}
                    <button
                        className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                        onClick={() => setPage((p) => p + 1)}
                        disabled={
                            meta
                                ? meta.page >= meta.totalPages || loading
                                : loading
                        }
                        aria-label="Next page"
                    >
                        Next
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Pagination;
