import {
  useCallback,
  useImperativeHandle,
  useRef,
  forwardRef,
  memo
} from 'react'
import clsx from 'clsx'
import {getVisualContextClassname} from '../internal/components/visual-context'
import InternalContainer from '../container/internal'
import {getBaseProps} from '../internal/base-component'
import ToolsHeader from './tools-header'
import Thead from './thead'
import {TableBodyCell} from './body-cell'
import {
  getColumnKey,
  getItemKey,
  getVisibleColumnDefinitions,
  toContainerVariant
} from './utils'
import {useRowEvents} from './use-row-events'
import {
  SelectionControl,
  focusMarkers,
  useSelectionFocusMove,
  useSelection
} from './selection'
import {ColumnWidthsProvider, DEFAULT_COLUMN_WIDTH} from './use-column-widths'
import {useScrollSync} from '../internal/hooks/use-scroll-sync'
import {ResizeTracker} from './resizer'
import styles from './styles.css.js'
import StickyHeader from './sticky-header'
import {useMergeRefs} from '../internal/hooks/use-merge-refs'
import useMouseDownTarget from '../internal/hooks/use-mouse-down-target'
import useTableFocusNavigation from './use-table-focus-navigation'
import {TableTdElement} from './body-cell/td-element'
import {useStickyColumns} from './sticky-columns'
import {StickyScrollbar} from './sticky-scrollbar'
import {useMobile} from '../internal/hooks/use-mobile'
import {useContainerQuery} from '~/components/internal/toolkit'
import {
  GridNavigationProvider,
  getTableRoleProps,
  getTableRowRoleProps,
  getTableWrapperRoleProps
} from './table-role'
import {useCellEditing} from './use-cell-editing'
import {LinkDefaultVariantContext} from '../internal/context/link-default-variant-context'
import {CollectionLabelContext} from '../internal/context/collection-label-context'
import {NoDataCell} from './no-data-cell'
import {useExpandableTableProps} from './expandable-rows/expandable-rows-utils'
import {ItemsLoader} from './progressive-loading/items-loader'
import {useProgressiveLoadingProps} from './progressive-loading/progressive-loading-utils'
import {usePrevious} from '../internal/hooks/use-previous'

const GRID_NAVIGATION_PAGE_SIZE = 10
const SELECTION_COLUMN_WIDTH = 54
const selectionColumnId = Symbol('selection-column-id')
const InternalTableAsSubstep = memo(
  forwardRef((props, ref) => {
    const tableProps = {
      ...props
    }
    return <InternalTable {...tableProps} ref={ref} />
  })
)
const InternalTable = memo(
  forwardRef(
    (
      {
        header,
        footer,
        empty,
        filter,
        pagination,
        preferences,
        items,
        columnDefinitions,
        trackBy,
        loading,
        loadingText,
        selectionType,
        selectedItems,
        isItemDisabled,
        ariaLabels,
        onSelectionChange,
        onSortingChange,
        sortingColumn,
        sortingDescending,
        sortingDisabled,
        visibleColumns,
        stickyHeader,
        stickyHeaderVerticalOffset,
        onRowClick,
        onRowContextMenu,
        wrapLines,
        stripedRows,
        contentDensity,
        submitEdit,
        onEditCancel,
        resizableColumns,
        onColumnWidthsChange,
        variant,
        __internalRootRef,
        totalItemsCount,
        firstIndex,
        stickyColumns,
        columnDisplay,
        enableKeyboardNavigation,
        expandableRows,
        getLoadingStatus,
        renderLoaderPending,
        renderLoaderLoading,
        renderLoaderError,
        ...rest
      },
      ref
    ) => {
      if (expandableRows && enableKeyboardNavigation === void 0) {
        enableKeyboardNavigation = true
      }
      const baseProps = getBaseProps(rest)
      const prevStickyHeader = usePrevious(stickyHeader)
      const isMobile = useMobile()
      const {isExpandable, allItems, getExpandableItemProps} =
        useExpandableTableProps({
          items,
          expandableRows,
          trackBy,
          ariaLabels
        })
      const {allRows} = useProgressiveLoadingProps({
        items: allItems,
        getLoadingStatus,
        getExpandableItemProps
      })
      const [containerWidth, wrapperMeasureRef] = useContainerQuery(
        rect => rect.contentBoxWidth
      )
      const wrapperMeasureRefObject = useRef(null)
      const wrapperMeasureMergedRef = useMergeRefs(
        wrapperMeasureRef,
        wrapperMeasureRefObject
      )
      const [tableWidth, tableMeasureRef] = useContainerQuery(
        rect => rect.contentBoxWidth
      )
      const tableRefObject = useRef(null)
      const secondaryWrapperRef = useRef(null)
      const theadRef = useRef(null)
      const stickyHeaderRef = useRef(null)
      const scrollbarRef = useRef(null)
      const {cancelEdit, ...cellEditing} = useCellEditing({
        onCancel: onEditCancel,
        onSubmit: submitEdit
      })
      useImperativeHandle(
        ref,
        () => ({
          scrollToTop: stickyHeaderRef.current?.scrollToTop || (() => void 0),
          cancelEdit
        }),
        [cancelEdit]
      )
      const wrapperRefObject = useRef(null)
      const handleScroll = useScrollSync([
        wrapperRefObject,
        scrollbarRef,
        secondaryWrapperRef
      ])
      const {moveFocusDown, moveFocusUp, moveFocus} = useSelectionFocusMove(
        selectionType,
        allItems.length
      )
      const {onRowClickHandler, onRowContextMenuHandler} = useRowEvents({
        onRowClick,
        onRowContextMenu
      })
      const visibleColumnDefinitions = getVisibleColumnDefinitions({
        columnDefinitions,
        columnDisplay,
        visibleColumns
      })
      const {isItemSelected, getSelectAllProps, getItemSelectionProps} =
        useSelection({
          items: allItems,
          trackBy,
          selectedItems,
          selectionType,
          isItemDisabled,
          onSelectionChange,
          ariaLabels,
          loading
        })
      const isRowSelected = row =>
        row.type === 'data' && isItemSelected(row.item)
      const computedVariant = variant
      const hasHeader = !!(header || filter || pagination || preferences)
      const hasSelection = !!selectionType
      const hasFooterPagination =
        isMobile && variant === 'full-page' && !!pagination
      const hasFooter = !!footer || hasFooterPagination
      const headerIdRef = useRef(void 0)
      const isLabelledByHeader = !ariaLabels?.tableLabel && !!header
      const setHeaderRef = useCallback(id => {
        headerIdRef.current = id
      }, [])
      const visibleColumnWidthsWithSelection = []
      const visibleColumnIdsWithSelection = []
      if (hasSelection) {
        visibleColumnWidthsWithSelection.push({
          id: selectionColumnId,
          width: SELECTION_COLUMN_WIDTH
        })
        visibleColumnIdsWithSelection.push(selectionColumnId)
      }
      for (
        let columnIndex = 0;
        columnIndex < visibleColumnDefinitions.length;
        columnIndex++
      ) {
        const columnId = getColumnKey(
          visibleColumnDefinitions[columnIndex],
          columnIndex
        )
        visibleColumnWidthsWithSelection.push({
          ...visibleColumnDefinitions[columnIndex],
          id: columnId
        })
        visibleColumnIdsWithSelection.push(columnId)
      }
      const stickyState = useStickyColumns({
        visibleColumns: visibleColumnIdsWithSelection,
        stickyColumnsFirst:
          (stickyColumns?.first ?? 0) +
          (stickyColumns?.first && hasSelection ? 1 : 0),
        stickyColumnsLast: stickyColumns?.last || 0
      })
      const hasStickyColumns = !!(
        (stickyColumns?.first ?? 0) + (stickyColumns?.last ?? 0) >
        0
      )
      const hasEditableCells = !!columnDefinitions.find(col => col.editConfig)
      let tableRole = 'table'
      if (isExpandable) {
        tableRole = 'treegrid'
      } else if (enableKeyboardNavigation) {
        tableRole = 'grid'
      } else if (hasEditableCells) {
        tableRole = 'grid-default'
      }
      const theadProps = {
        selectionType,
        getSelectAllProps,
        columnDefinitions: visibleColumnDefinitions,
        variant: computedVariant,
        wrapLines,
        resizableColumns,
        sortingColumn,
        sortingDisabled,
        sortingDescending,
        onSortingChange,
        onFocusMove: moveFocus,
        onResizeFinish(newWidth) {
          const widthsDetail = columnDefinitions.map(
            (column, index) =>
              newWidth.get(getColumnKey(column, index)) ||
              column.width ||
              DEFAULT_COLUMN_WIDTH
          )
          const widthsChanged = widthsDetail.some(
            (width, index) => columnDefinitions[index].width !== width
          )
          if (widthsChanged) {
            onColumnWidthsChange?.({widths: widthsDetail})
          }
        },
        singleSelectionHeaderAriaLabel: ariaLabels?.selectionGroupLabel,
        resizerRoleDescription: ariaLabels?.resizerRoleDescription,
        stripedRows,
        stickyState,
        selectionColumnId,
        tableRole,
        isExpandable
      }
      const wrapperRef = useMergeRefs(
        wrapperRefObject,
        stickyState.refs.wrapper
      )
      const tableRef = useMergeRefs(
        tableMeasureRef,
        tableRefObject,
        stickyState.refs.table
      )
      const wrapperProps = getTableWrapperRoleProps({
        tableRole,
        isScrollable: !!(
          tableWidth &&
          containerWidth &&
          tableWidth > containerWidth
        ),
        ariaLabel: ariaLabels?.tableLabel
      })
      const getMouseDownTarget = useMouseDownTarget()
      useTableFocusNavigation({
        enableKeyboardNavigation,
        selectionType,
        tableRoot: tableRefObject,
        columnDefinitions: visibleColumnDefinitions,
        numRows: allRows?.length
      })
      const toolsHeaderPerformanceMarkRef = useRef(null)
      const [toolsHeaderHeight, toolsHeaderWrapperMeasureRef] =
        useContainerQuery(rect => rect.borderBoxHeight)
      const toolsHeaderWrapper = useMergeRefs(
        toolsHeaderPerformanceMarkRef,
        toolsHeaderWrapperMeasureRef
      )
      const colIndexOffset = selectionType ? 1 : 0
      const totalColumnsCount =
        visibleColumnDefinitions.length + colIndexOffset
      return (
        <LinkDefaultVariantContext.Provider
          value={{defaultVariant: 'primary'}}>
          <ColumnWidthsProvider
            visibleColumns={visibleColumnWidthsWithSelection}
            resizableColumns={resizableColumns}
            containerRef={wrapperMeasureRefObject}>
            <InternalContainer
              {...baseProps}
              __internalRootRef={__internalRootRef}
              className={clsx(baseProps.className, styles.root)}
              __fullPage={variant === 'full-page'}
              header={
                <>
                  {hasHeader && (
                    <div>
                      <div
                        ref={toolsHeaderWrapper}
                        className={clsx(
                          styles['header-controls'],
                          styles[`variant-${computedVariant}`]
                        )}>
                        <CollectionLabelContext.Provider
                          value={{assignId: setHeaderRef}}>
                          <ToolsHeader
                            header={header}
                            filter={filter}
                            pagination={pagination}
                            preferences={preferences}
                          />
                        </CollectionLabelContext.Provider>
                      </div>
                    </div>
                  )}
                  {stickyHeader && (
                    <StickyHeader
                      ref={stickyHeaderRef}
                      variant={computedVariant}
                      theadProps={theadProps}
                      wrapperRef={wrapperRefObject}
                      theadRef={theadRef}
                      secondaryWrapperRef={secondaryWrapperRef}
                      tableRef={tableRefObject}
                      onScroll={handleScroll}
                      tableHasHeader={hasHeader}
                      contentDensity={contentDensity}
                      tableRole={tableRole}
                    />
                  )}
                </>
              }
              disableHeaderPaddings={true}
              disableContentPaddings={true}
              variant={toContainerVariant(computedVariant)}
              __disableFooterPaddings={true}
              __disableFooterDivider={true}
              __disableStickyMobile={false}
              footer={
                hasFooter ? (
                  <div
                    className={clsx(
                      styles['footer-wrapper'],
                      styles[`variant-${computedVariant}`]
                    )}>
                    <div
                      className={clsx(
                        styles.footer,
                        hasFooterPagination && styles['footer-with-pagination']
                      )}>
                      {footer && <span>{footer}</span>}
                      {hasFooterPagination && (
                        <div className={styles['footer-pagination']}>
                          {pagination}
                        </div>
                      )}
                    </div>
                  </div>
                ) : null
              }
              __stickyHeader={stickyHeader}
              __mobileStickyOffset={toolsHeaderHeight ?? 0}
              __stickyOffset={stickyHeaderVerticalOffset}
              {...focusMarkers.root}>
              <div
                ref={wrapperRef}
                className={clsx(
                  styles.wrapper,
                  styles[`variant-${computedVariant}`],
                  {
                    [styles['has-footer']]: hasFooter,
                    [styles['has-header']]: hasHeader
                  }
                )}
                style={stickyState.style.wrapper}
                onScroll={handleScroll}
                {...wrapperProps}>
                <div
                  className={styles['wrapper-content-measure']}
                  ref={wrapperMeasureMergedRef}
                />
                <GridNavigationProvider
                  keyboardNavigation={!!enableKeyboardNavigation}
                  pageSize={GRID_NAVIGATION_PAGE_SIZE}
                  getTable={() => tableRefObject.current}>
                  <table
                    ref={tableRef}
                    className={clsx(
                      styles.table,
                      resizableColumns && styles['table-layout-fixed'],
                      contentDensity === 'compact' &&
                        getVisualContextClassname('compact-table')
                    )}
                    {...getTableRoleProps({
                      tableRole,
                      totalItemsCount,
                      totalColumnsCount,
                      ariaLabel: ariaLabels?.tableLabel,
                      ariaLabelledBy:
                        isLabelledByHeader && headerIdRef.current
                          ? headerIdRef.current
                          : void 0
                    })}>
                    <Thead
                      ref={theadRef}
                      hidden={stickyHeader}
                      onFocusedComponentChange={focusId =>
                        stickyHeaderRef.current?.setFocus(focusId)
                      }
                      {...theadProps}
                    />
                    <tbody>
                      {loading || allItems.length === 0 ? (
                        <tr>
                          <NoDataCell
                            totalColumnsCount={totalColumnsCount}
                            hasFooter={hasFooter}
                            loading={loading}
                            loadingText={loadingText}
                            empty={empty}
                            tableRef={tableRefObject}
                            containerRef={wrapperMeasureRefObject}
                          />
                        </tr>
                      ) : (
                        allRows.map((row, rowIndex) => {
                          const isFirstRow = rowIndex === 0
                          const isLastRow = rowIndex === allRows.length - 1
                          const expandableProps =
                            row.type === 'data'
                              ? getExpandableItemProps(row.item)
                              : void 0
                          const rowRoleProps = getTableRowRoleProps({
                            tableRole,
                            firstIndex,
                            rowIndex,
                            level: row.type === 'loader' ? row.level : void 0,
                            ...expandableProps
                          })
                          const getTableItemKey = item =>
                            getItemKey(trackBy, item, rowIndex)
                          const sharedCellProps = {
                            isFirstRow,
                            isLastRow,
                            isSelected: hasSelection && isRowSelected(row),
                            isPrevSelected:
                              hasSelection &&
                              !isFirstRow &&
                              isRowSelected(allRows[rowIndex - 1]),
                            isNextSelected:
                              hasSelection &&
                              !isLastRow &&
                              isRowSelected(allRows[rowIndex + 1]),
                            isEvenRow: rowIndex % 2 === 0,
                            stripedRows,
                            hasSelection,
                            hasFooter,
                            stickyState,
                            tableRole
                          }
                          if (row.type === 'data') {
                            return (
                              <tr
                                key={getTableItemKey(row.item)}
                                className={clsx(
                                  styles.row,
                                  sharedCellProps.isSelected &&
                                    styles['row-selected']
                                )}
                                onFocus={({currentTarget}) => {
                                  if (
                                    !currentTarget.contains(
                                      getMouseDownTarget()
                                    )
                                  ) {
                                    stickyHeaderRef.current?.scrollToRow(
                                      currentTarget
                                    )
                                  }
                                }}
                                {...focusMarkers.item}
                                onClick={
                                  onRowClickHandler &&
                                  onRowClickHandler.bind(
                                    null,
                                    rowIndex,
                                    row.item
                                  )
                                }
                                onContextMenu={
                                  onRowContextMenuHandler &&
                                  onRowContextMenuHandler.bind(
                                    null,
                                    rowIndex,
                                    row.item
                                  )
                                }
                                {...rowRoleProps}>
                                {getItemSelectionProps && (
                                  <TableTdElement
                                    {...sharedCellProps}
                                    className={clsx(
                                      styles['selection-control']
                                    )}
                                    wrapLines={false}
                                    columnId={selectionColumnId}
                                    colIndex={0}>
                                    <SelectionControl
                                      onFocusDown={moveFocusDown}
                                      onFocusUp={moveFocusUp}
                                      {...getItemSelectionProps(row.item)}
                                    />
                                  </TableTdElement>
                                )}
                                {visibleColumnDefinitions.map(
                                  (column, colIndex) => {
                                    const isEditing = cellEditing.checkEditing(
                                      {rowIndex, colIndex}
                                    )
                                    const successfulEdit =
                                      cellEditing.checkLastSuccessfulEdit({
                                        rowIndex,
                                        colIndex
                                      })
                                    const isEditable =
                                      !!column.editConfig &&
                                      !cellEditing.isLoading
                                    const cellExpandableProps =
                                      isExpandable && colIndex === 0
                                        ? expandableProps
                                        : void 0
                                    return (
                                      <TableBodyCell
                                        key={getColumnKey(column, colIndex)}
                                        {...sharedCellProps}
                                        style={
                                          resizableColumns
                                            ? {}
                                            : {
                                                width: column.width,
                                                minWidth: column.minWidth,
                                                maxWidth: column.maxWidth
                                              }
                                        }
                                        ariaLabels={ariaLabels}
                                        column={column}
                                        item={row.item}
                                        wrapLines={wrapLines}
                                        isEditable={isEditable}
                                        isEditing={isEditing}
                                        isRowHeader={column.isRowHeader}
                                        successfulEdit={successfulEdit}
                                        resizableColumns={resizableColumns}
                                        onEditStart={() =>
                                          cellEditing.startEdit({
                                            rowIndex,
                                            colIndex
                                          })
                                        }
                                        onEditEnd={editCancelled =>
                                          cellEditing.completeEdit(
                                            {rowIndex, colIndex},
                                            editCancelled
                                          )
                                        }
                                        submitEdit={cellEditing.submitEdit}
                                        columnId={column.id ?? colIndex}
                                        colIndex={colIndex + colIndexOffset}
                                        {...cellExpandableProps}
                                      />
                                    )
                                  }
                                )}
                              </tr>
                            )
                          }
                          return (
                            <tr
                              key={
                                (row.item
                                  ? getTableItemKey(row.item)
                                  : 'root-' + rowIndex) +
                                '-' +
                                row.from
                              }
                              className={styles.row}
                              {...rowRoleProps}>
                              {getItemSelectionProps && (
                                <TableTdElement
                                  {...sharedCellProps}
                                  className={clsx(styles['selection-control'])}
                                  wrapLines={false}
                                  columnId={selectionColumnId}
                                  colIndex={0}>
                                  {null}
                                </TableTdElement>
                              )}
                              {visibleColumnDefinitions.map(
                                (column, colIndex) => (
                                  <TableTdElement
                                    key={getColumnKey(column, colIndex)}
                                    {...sharedCellProps}
                                    wrapLines={false}
                                    columnId={column.id ?? colIndex}
                                    colIndex={colIndex + colIndexOffset}
                                    isRowHeader={colIndex === 0}
                                    level={row.level}>
                                    {colIndex === 0 ? (
                                      <ItemsLoader
                                        item={row.item}
                                        loadingStatus={row.status}
                                        renderLoaderPending={
                                          renderLoaderPending
                                        }
                                        renderLoaderLoading={
                                          renderLoaderLoading
                                        }
                                        renderLoaderError={renderLoaderError}
                                        trackBy={trackBy}
                                      />
                                    ) : null}
                                  </TableTdElement>
                                )
                              )}
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </GridNavigationProvider>
                {resizableColumns && <ResizeTracker/>}
              </div>
              <StickyScrollbar
                ref={scrollbarRef}
                wrapperRef={wrapperRefObject}
                tableRef={tableRefObject}
                onScroll={handleScroll}
                hasStickyColumns={hasStickyColumns}
              />
            </InternalContainer>
          </ColumnWidthsProvider>
        </LinkDefaultVariantContext.Provider>
      )
    }
  )
)

export {
  InternalTableAsSubstep,
  InternalTable as default
}
