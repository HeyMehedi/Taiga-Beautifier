(function () {    
    // ✅ Function to update issue count dynamically
    function updateIssueCount() {
        document.querySelectorAll('.issues-table').forEach(table => {
            // Get all currently visible rows after filtering
            const rows = table.querySelectorAll('.row.table-main');
            const count = rows.length;

            console.log(`Updating issue count: ${count}`); // Debugging log

            // Find the `.issue-table-options-start` container
            const optionsStart = document.querySelector('.issue-table-options-start');

            if (optionsStart) {
                let countElement = optionsStart.querySelector('.issue-count');
                if (!countElement) {
                    countElement = document.createElement('span');
                    countElement.classList.add('issue-count'); 
                    countElement.id = 'issue-count'; 
                    optionsStart.appendChild(countElement);
                }

                // Ensure `0` is also displayed when no issues are found
                countElement.textContent = `${count} tickets found`;
            }
        });

        document.querySelectorAll(".table-main").forEach(function (issueRow) {
            let dueDateElement = issueRow.querySelector(".due-date-icon");
            console.log('dueDateElement : ', dueDateElement );
            if (dueDateElement && dueDateElement.title.includes("Past Due")) {
                issueRow.classList.add("past-soon");
            }
        });

        document.querySelectorAll(".table-main").forEach(function (issueRow) {
            let dueDateElement = issueRow.querySelector(".due-date-icon");
            console.log('dueDateElement : ', dueDateElement );
            if (dueDateElement && dueDateElement.title.includes("Due soon")) {
                issueRow.classList.add("due-soon");
            }
        });
    }

    // ✅ Function to watch URL changes (detect navigation events)
    function watchURLChanges() {
        let lastUrl = location.href;
        const observer = new MutationObserver(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                setTimeout(updateIssueCount, 500); // Add slight delay to ensure DOM updates
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // ✅ Observe changes in the `.issues-table` itself
    function observeTableChanges() {
        document.querySelectorAll('.issues-table').forEach(table => {
            const tableObserver = new MutationObserver(() => {
                updateIssueCount();
            });

            tableObserver.observe(table, { childList: true, subtree: true });
        });
    }

    // ✅ Watch for URL changes
    watchURLChanges();

    // ✅ Observe table content updates
    setTimeout(observeTableChanges, 3000);

    // ✅ Initial count update
    setTimeout(updateIssueCount, 3000);
})();
