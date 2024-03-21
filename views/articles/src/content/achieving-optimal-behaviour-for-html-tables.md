{{HEAD}}
title=Achieving Optimal Behaviour For HTML Tables
date=2024-03-21
description=A simple guide to achieving the best possible behaviour for those pesky HTML tables.

{{BODY}}

# Achieving Optimal Behaviour For HTML Tables

HTML tables is probably one of the things developers dislike working with most. This is primarily due to the many quirks and difficulties with styling them. In addition to the difficulties with styling tables, there is also the issue of achieving dynamic and responsive behaviour. That is the primary focus of this article.

## Preferred Behavior

Below is the desired behaviour of our table:

-   One or more columns have a fixed width.
-   One or more columns hug their content.
-   One or more columns grow and shrink to fill the available space, but have a minimum width, so the column doesn't disappear entirely.
-   Sticky header.
-   Horizontal and vertical scroll.

These may appear to be simple goals, but since we're dealing with tables, and want all of them at once, it can be something of a pain to figure out.

## Example

<div class="example-table-wrapper">
    <table>
        <thead>
            <tr>
                <th class="width-auto">Name</th>
                <th class="width-none"></th>
                <th class="width-hug">Age</th>
                <th class="width-fixed">Email</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="width-auto" colspan="2">John Smith</td>
                <td class="width-hug">24</td>
                <td class="width-fixed">aprettylongemail@gmail.com</td>
            </tr>
            <tr>
                <td class="width-auto" colspan="2">
                    Jane Erica Smithsonian Doe
                </td>
                <td class="width-hug">25</td>
                <td class="width-fixed">mymail@gmail.com</td>
            </tr>
            <tr>
                <td class="width-auto" colspan="2">Ron Weasly</td>
                <td class="width-hug">11</td>
                <td class="width-fixed">rw@gmail.com</td>
            </tr>
            <tr>
                <td class="width-auto" colspan="2">Harry Potter</td>
                <td class="width-hug">11</td>
                <td class="width-fixed">hp@gmail.com</td>
            </tr>
            <tr>
                <td class="width-auto" colspan="2">Hermione Granger</td>
                <td class="width-hug">11</td>
                <td class="width-fixed">hg@gmail.com</td>
            </tr>
        </tbody>
    </table>
</div>

<style>
    .example-table-wrapper {
        overflow: auto;
        max-height: 150px;
        text-align: left;
    }

    .example-table-wrapper table {
        width: 100%;
        border-spacing: 0;
    }

    .example-table-wrapper th {
        position: sticky;
        top: 0;
        background: #e0e0e0;
        padding: 10px;
    }

    .example-table-wrapper td {
        background: #f0f0f0;
        padding: 10px;
    }

    .example-table-wrapper .width-auto {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 150px;
        max-width: 150px;
    }

    .example-table-wrapper .width-none {
        padding: 0;
    }

    .example-table-wrapper .width-hug {
        white-space: nowrap;
        width: 0;
    }

    .example-table-wrapper .width-fixed {
        width: 300px;
        min-width: 300px;
    }
</style>

<details style="margin-top: 16px;">
<summary>Exact example code</summary>

```html
<div class="example-table-wrapper">
    <table>
        <thead>
            <tr>
                <th class="width-auto">Name</th>
                <th class="width-none"></th>
                <th class="width-hug">Age</th>
                <th class="width-fixed">Email</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="width-auto" colspan="2">John Smith</td>
                <td class="width-hug">24</td>
                <td class="width-fixed">aprettylongemail@gmail.com</td>
            </tr>
            <tr>
                <td class="width-auto" colspan="2">
                    Jane Erica Smithsonian Doe
                </td>
                <td class="width-hug">25</td>
                <td class="width-fixed">mymail@gmail.com</td>
            </tr>
            <tr>
                <td class="width-auto" colspan="2">Ron Weasly</td>
                <td class="width-hug">11</td>
                <td class="width-fixed">rw@gmail.com</td>
            </tr>
            <tr>
                <td class="width-auto" colspan="2">Harry Potter</td>
                <td class="width-hug">11</td>
                <td class="width-fixed">hp@gmail.com</td>
            </tr>
            <tr>
                <td class="width-auto" colspan="2">Hermione Granger</td>
                <td class="width-hug">11</td>
                <td class="width-fixed">hg@gmail.com</td>
            </tr>
        </tbody>
    </table>
</div>

<style>
    .example-table-wrapper {
        overflow: auto;
        max-height: 150px;
        text-align: left;
    }

    .example-table-wrapper table {
        width: 100%;
        border-spacing: 0;
    }

    .example-table-wrapper th {
        position: sticky;
        top: 0;
        background: #e0e0e0;
        padding: 10px;
    }

    .example-table-wrapper td {
        background: #f0f0f0;
        padding: 10px;
    }

    .example-table-wrapper .width-auto {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 150px;
        max-width: 150px;
    }

    .example-table-wrapper .width-none {
        padding: 0;
    }

    .example-table-wrapper .width-hug {
        white-space: nowrap;
        width: 0;
    }

    .example-table-wrapper .width-fixed {
        width: 300px;
        min-width: 300px;
    }
</style>
```

</details>

## Code

Since us developers tend to skim articles for code first, here is my opinion of an optimal table template. The HTML is quite standard, so focus on the CSS. The classes are mainly here to help with understanding.

HTML:

```html
<div class="wrapper">
    <table>
        <thead>
            <tr>
                <th class="width-auto">Name</th>
                <th></th>
                <th class="width-hug">Age</th>
                <th class="width-fixed">Email</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="width-auto" colspan="2">John Smith</td>
                <td class="width-hug">24</td>
                <td class="width-fixed">aprettylongemail@gmail.com</td>
            </tr>

            <tr>
                <td class="width-auto" colspan="2">
                    Jane Erica Smithsonian Doe
                </td>
                <td class="width-hug">25</td>
                <td class="width-fixed">mymail@gmail.com</td>
            </tr>
        </tbody>
    </table>
</div>
```

CSS:

```css
.wrapper {
    overflow: auto;
    max-height: 400px;
}

table {
    width: 100%;
    border-spacing: 0;
}

th {
    position: sticky;
    top: 0;
}

.width-auto {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 200px;
    max-width: 200px;
}

.width-hug {
    white-space: nowrap;
    width: 0;
}

.width-fixed {
    width: 300px;
    min-width: 300px;
}
```

## Explanation and pitfalls

This solution relies on a bunch of strange table quirks, and the solution to each problem is a little bit weird, so I'll go through them one by one, if a bit roughly.

### Fixed width

To get a table column to have a fixed width, one would usually use `table-layout: fixed`, but this requires defining fixed widths for all columns, which we do not want. Instead of doing that, we set `width`, and `max-width` for both the header and its cells, resulting in a perfectly sized column.

There is one pitfall, however. For this to function as expected, there must be at least one column without a fixed width, which can take up the remainder of the table's space when necessary. An empty column is fine, of course - it just has to exist.

### Hug

By preventing the text from wrapping and setting the width to 0 on both the header and its cells, we achieve a column which defines its width based on its content. Note that the pitfall for fixed width columns also applies here.

### Auto

The automatically scaling column width is perhaps the most complex of the width defining methods. It relies on an additional `<th>`, which must have no padding or border, as it will destroy your layout if it does. It must also be empty. Then, each cell must have `colspan="2"` defined. This, effectively, allows all the cells in the column to expand to fill into the second, empty column. Note that there should not be any additional `<td>` elements.

This empty column will then automatically fill out the rest of the space. Ordinarily, this would mean a lot of empty space, but by letting each cell expand into the empty column, the content from the first column will be visible within the expanded second column.

There are two side effects of this. The first being that the content is abruptly cut off without any warning, and potentially wrapped. This is solved with a simple ellipsis truncation, as seen in the code template.

The final problem we have to solve, is that the element can now become incredibly tiny, which will result in hiding its content. To fix this, be merely reuse the fixed width concept by defining `width`, `min-width` on the header and cells in the first column, which will prevent the column from becoming any smaller than that.

### Sticky header

To sticky the header in a table, you cannot simply `display: sticky` the `<thead>` or the `<tr>` within it. Instead, you must apply it to each of the `<th>`. And don't forget to set `top: 0`, so it sticks to the top. Additionally, for this to work, the table must be inside of a vertical scroll view (see example).

## Conclusion

I hope this article saves you a lot of pain, research, and experimentation. If you found anything in it unclear, feel free to contact me directly.
