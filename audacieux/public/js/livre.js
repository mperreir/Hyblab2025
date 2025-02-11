class InteractiveBook {
    constructor(bookElement, activation) {
        this.book = bookElement;
        this.activation = activation
        this.content = this.book.querySelector('.content');
        this.bookCover = this.book.querySelector('.book-cover');
        this.pages = Array.from(this.content.querySelectorAll('.page'));
        this.currentPageIndex = 0;
        this.loaded_page = [];
        fetch("data/book-content.json")
        .then(response => response.json())
        .then(data => {
            this.page_data = data;
            this.updatePageTime(0);
        });

        this.initializeEvents();
    }

    initializeEvents() {
        // Allow opening book from either cover or main body
        this.activation.addEventListener('click', (e) => {
            // Prevent opening if clicking on navigation buttons
            if (e.target.closest('.navigation')) return;
            this.toggleBookState();
        });
    }

    toggleBookState() {
        this.book.classList.toggle('open');
        
        if (this.book.classList.contains('open')) {
            this.openBook();
        } else {
            this.closeBook();
        }
    }

    openBook() {
        playAudioTrigger("data/audio_scene.json", "livreNext");
        this.book.style.visibility = "visible";
        this.activation.classList.remove("notification-img");

        const bookContainer = document.createElement('div');
        bookContainer.className = 'book-container';

        const currentPagesContainer = document.createElement('div');
        currentPagesContainer.className = 'current-pages';

        const currentPages = this.pages.slice(this.currentPageIndex, this.currentPageIndex + 2);
        currentPages.forEach(page => {
            const clonedPage = page.cloneNode(true);
            clonedPage.style.display = 'block';
            clonedPage.classList.add('visible'); // Add animation class
            currentPagesContainer.appendChild(clonedPage);
        });

        bookContainer.appendChild(currentPagesContainer);

        const navigation = document.createElement('div');
        navigation.className = 'navigation';
        navigation.innerHTML = `
            <button id="prev">Précédent</button>
            <button id="next">Suivant</button>
        `;

        this.book.appendChild(bookContainer);
        this.book.appendChild(navigation);

        this.book.querySelector('#prev').addEventListener('click', (e) => {
            playAudioTrigger("data/audio_scene.json", "livrePrev");
            e.stopPropagation();
            this.navigatePage(-2);
        });
        this.book.querySelector('#next').addEventListener('click', (e) => {
            playAudioTrigger("data/audio_scene.json", "livreNext");
            e.stopPropagation();
            this.navigatePage(2);
        });
    }

    closeBook() {
        playAudioTrigger("data/audio_scene.json", "livreFerme");
        // Remove book container and navigation
        const bookContainer = this.book.querySelector('.book-container');
        const navigation = this.book.querySelector('.navigation');

        this.book.style.visibility = "hidden";
        
        if (bookContainer) this.book.removeChild(bookContainer);
        if (navigation) this.book.removeChild(navigation);

        
    }

    navigatePage(step) {
        const newIndex = this.currentPageIndex + step;
        if (newIndex >= 0 && newIndex < this.pages.length) {
            this.currentPageIndex = newIndex;
            this.updatePageView();
        }
    }

    /* Ajout d'une mise à jour de la vue des pages */
    updatePageView() {
        const bookContainer = this.book.querySelector('.book-container');
        const currentPagesContainer = bookContainer.querySelector('.current-pages');
        currentPagesContainer.innerHTML = '';

        const currentPages = this.pages.slice(this.currentPageIndex, this.currentPageIndex + 2);
        currentPages.forEach(page => {
            const clonedPage = page.cloneNode(true);
            clonedPage.style.display = 'block';
            clonedPage.classList.add('visible'); // Trigger animation
            currentPagesContainer.appendChild(clonedPage);
        });

        if (currentPages.length === 1) {
            const emptyPage = document.createElement('div');
            emptyPage.classList.add('right-page', 'page');
            currentPagesContainer.appendChild(emptyPage);
        }
    }


    updatePageTime(timeStep){
        
        for(let i = 0; i < this.page_data.pages_time.length; i += 1)
        {
            const page = this.page_data.pages_time[i];
            if(page.step <= timeStep && !this.loaded_page.includes(page.id)){
                this.loaded_page.push(page.id);

                let new_page = document.createElement('div');
                new_page.classList.add("page");
                if(this.pages.length % 2 == 0){
                    new_page.classList.add("left-page");
                }else{
                    new_page.classList.add("right-page");
                }

                let title = document.createElement('h2');
                title.innerHTML = page.title;
                new_page.appendChild(title)

                let paragraph = document.createElement('p');
                paragraph.innerHTML = page.content;
                new_page.appendChild(paragraph)
                
                this.pages.push(new_page);
                this.book.style.visibility = "hidden";
                
                this.content.appendChild(new_page);

                this.activation.classList.add("notification-img");

            }
        }
    }

    updatePageCallback(content_id){

    }
}


