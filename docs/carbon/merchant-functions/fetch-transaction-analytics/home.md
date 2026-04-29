# Fetch Transaction Analytics

Retrieves aggregated transaction analytics for a specific merchant. This can include analytics by store, terminal, date range, card brand, and more.

{% callout type="note" label="Note" %}
To filter analytics by date range, send in startDate and endDate as query params. You can also use additional query parameters like storeId, terminalId, orderType, etc. Grouping the results can be controlled via the groupBy object in the query.
{% /callout %}