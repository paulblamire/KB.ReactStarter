// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { createSectionIterator } from './section-iterator';
import themeable from './react-themeable';

function noop() { }

export interface IItemPropsFunction {
    (data: { sectionIndex: number, itemIndex: number }): IItemProperties;
}

export interface IItemEvent {
    (event: React.SyntheticEvent, position: { sectionIndex: number, itemIndex: number }): void;
}

export interface IItemProperties {
    'data-section-index'?: number;
    'data-suggestion-index'?: number;
    onMouseEnter?: IItemEvent;
    onMouseLeave?: IItemEvent;
    onMouseDown?: IItemEvent;
    onTouchStart?: IItemEvent;
    onClick?: IItemEvent;
}

export interface IAutoWhateverProps {
    id: string;                     // Used in aria-* attributes. If multiple Autowhatever's are rendered on a page, they must have unique ids.
    multiSection: boolean;          // Indicates whether a multi section layout should be rendered.
    items?: Object[];                   // Array of items or sections to render.
    renderItem: { (section: Object): JSX.Element };           // This function renders a single item.
    shouldRenderSection: { (section: Object) : boolean };  // This function gets a section and returns whether it should be rendered, or not.
    renderSectionTitle: { (section: Object): string };   // This function gets a section and renders its title.
    getSectionItems: { (section: Object): Object[] };      // This function gets a section and returns its items, which will be passed into `renderItem` for rendering.
    inputProps: any;                // Arbitrary input props
    itemProps: IItemProperties | IItemPropsFunction;   // Arbitrary item props
    focusedSectionIndex: number;    // Section index of the focused item
    focusedItemIndex: number;       // Focused item index (within a section)
    theme: Object;                  // Styles. See: https://github.com/markdalgleish/react-themeable
}

export default class Autowhatever extends React.Component<IAutoWhateverProps, any> {

    static defaultProps: IAutoWhateverProps = {
        id: '1',
        multiSection: false,
        shouldRenderSection: (o : Object) => true,
        renderItem: (o: Object) : JSX.Element => {
            throw new Error('`renderItem` must be provided');
        },
        renderSectionTitle: (o: Object) : string => {
            throw new Error('`renderSectionTitle` must be provided');
        },
        getSectionItems: (o: Object) : Object[] => {
            throw new Error('`getSectionItems` must be provided');
        },
        inputProps: {},
        itemProps: {},
        focusedSectionIndex: null,
        focusedItemIndex: null,
        theme: {
            container: 'react-autowhatever__container',
            containerOpen: 'react-autowhatever__container--open',
            input: 'react-autowhatever__input',
            itemsContainer: 'react-autowhatever__items-container',
            item: 'react-autowhatever__item',
            itemFocused: 'react-autowhatever__item--focused',
            sectionContainer: 'react-autowhatever__section-container',
            sectionTitle: 'react-autowhatever__section-title',
            sectionItemsContainer: 'react-autowhatever__section-items-container'
        }
    };

    onKeyDown(event) {
        const { inputProps, focusedSectionIndex, focusedItemIndex } = this.props;
        const { onKeyDown: onKeyDownFn } = inputProps; // Babel is throwing:
        //   "onKeyDown" is read-only
        // on:
        //   const { onKeyDown } = inputProps;

        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
                const { multiSection, items, getSectionItems } = this.props;
                const sectionIterator = createSectionIterator({
                    multiSection,
                    data: multiSection ?
                        items.map(section => getSectionItems(section).length) :
                        items.length
                });
                const nextPrev = (event.key === 'ArrowDown' ? 'next' : 'prev');
                const [newFocusedSectionIndex, newFocusedItemIndex] =
                    sectionIterator[nextPrev]([focusedSectionIndex, focusedItemIndex]);

                onKeyDownFn(event, { newFocusedSectionIndex, newFocusedItemIndex });
                break;

            default:
                onKeyDownFn(event, { focusedSectionIndex, focusedItemIndex });
        }
    }

    constructor(props) {
        super(props);

        this.onKeyDown = this.onKeyDown.bind(this);
    }

    getItemId(sectionIndex, itemIndex) {
        if (itemIndex === null) {
            return null;
        }

        const { id } = this.props;
        const section = (sectionIndex === null ? '' : `section-${sectionIndex}`);

        return `react-autowhatever-${id}-${section}-item-${itemIndex}`;
    }

    getItemsContainerId() {
        const { id } = this.props;

        return `react-whatever-${id}`;
    }

    renderItemsList(theme, items, sectionIndex) {
        const { renderItem, focusedSectionIndex, focusedItemIndex } = this.props;
        const isItemPropsFunction = (typeof this.props.itemProps === 'function');

        return items.map((item, itemIndex) => {
            const itemPropsObj: IItemProperties = isItemPropsFunction
                ? (this.props.itemProps as IItemPropsFunction)({ sectionIndex, itemIndex })
                : this.props.itemProps;
            const { onMouseEnter, onMouseLeave, onMouseDown, onClick } = itemPropsObj;

            const onMouseEnterFn = onMouseEnter ?
                event => onMouseEnter(event, { sectionIndex, itemIndex }) :
                noop;
            const onMouseLeaveFn = onMouseLeave ?
                event => onMouseLeave(event, { sectionIndex, itemIndex }) :
                noop;
            const onMouseDownFn = onMouseDown ?
                event => onMouseDown(event, { sectionIndex, itemIndex }) :
                noop;
            const onClickFn = onClick ?
                event => onClick(event, { sectionIndex, itemIndex }) :
                noop;

            const itemProps = Object.assign({
                id: this.getItemId(sectionIndex, itemIndex),
                role: 'option',
                onMouseEnter: onMouseEnterFn,
                onMouseLeave: onMouseLeaveFn,
                onMouseDown: onMouseDownFn,
                onClick: onClickFn
            }, theme(itemIndex, 'item', sectionIndex === focusedSectionIndex &&
                itemIndex === focusedItemIndex &&
                'itemFocused'), itemPropsObj);

            return (
                <li {...itemProps}>
                    {renderItem(item) }
                </li>
            );
        });
    }

    renderSections(theme) {
        const { items, getSectionItems } = this.props;
        const sectionItemsArray = items.map(section => getSectionItems(section));
        const noItemsExist = sectionItemsArray.every(sectionItems => sectionItems.length === 0);

        if (noItemsExist) {
            return null;
        }

        const { shouldRenderSection, renderSectionTitle } = this.props;

        return (
            <div id={this.getItemsContainerId() }
                role="listbox"
                {...theme('itemsContainer', 'itemsContainer') }>
                {
                    items.map((section, sectionIndex) => {
                        if (!shouldRenderSection(section)) {
                            return null;
                        }

                        const sectionTitle = renderSectionTitle(section);

                        return (
                            <div key={sectionIndex}
                                {...theme(sectionIndex, 'sectionContainer') }>
                                {
                                    sectionTitle &&
                                    <div {...theme('sectionTitle', 'sectionTitle') }>
                                        {sectionTitle}
                                    </div>
                                }
                                <ul {...theme('sectionItemsContainer', 'sectionItemsContainer') }>
                                    {this.renderItemsList(theme, sectionItemsArray[sectionIndex], sectionIndex) }
                                </ul>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    renderItems(theme) {
        const { items } = this.props;

        if (items.length === 0) {
            return null;
        }

        return (
            <ul id={this.getItemsContainerId() }
                role="listbox"
                {...theme('itemsContainer', 'itemsContainer') }>
                {this.renderItemsList(theme, items, null) }
            </ul>
        );
    }



    render() : JSX.Element {
        const { multiSection, focusedSectionIndex, focusedItemIndex } = this.props;
        const theme = themeable(this.props.theme);
        const renderedItems = multiSection ? this.renderSections(theme) : this.renderItems(theme);
        const isOpen = (renderedItems !== null);
        const ariaActivedescendant = this.getItemId(focusedSectionIndex, focusedItemIndex);
        const inputProps = Object.assign({
            type: 'text',
            value: '',
            autoComplete: 'off',
            role: 'combobox',
            ref: 'input',
            'aria-autocomplete': 'list',
            'aria-owns': this.getItemsContainerId(),
            'aria-expanded': isOpen,
            'aria-activedescendant': ariaActivedescendant,
            onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown
    }, theme('input', 'input'), this.props.inputProps);

    return(
    <div {...theme('container', 'container', isOpen && 'containerOpen') }>
    <input {...inputProps} />
    {renderedItems}
</div>
);
  }
}

