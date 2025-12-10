import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showInfoNotification } from "@utils/notifications.jsx";
import Dashboard from "@components/Dashboard/Dashboard.jsx";
import BookCard from "@components/BookCard/BookCard.jsx";
import BookModal from "@components/BookModal/BookModal.jsx";
import Icon from "@components/Icon/Icon.jsx";
import css from "./HomePage.module.css";

// 🎭 Mock data для демонстрації
const MOCK_BOOKS = [
  {
    _id: "mock-1",
    title: "White ashes",
    author: "Illarion Pavliuk",
    imageUrl:
      "https://ftp.goit.study/img/readjourney/6546d503efab13a4ce5618a1_White_ashes.webp",
    totalPages: 352,
  },
  {
    _id: "mock-2",
    title: "The tigers",
    author: "Ivan Bahrianyi",
    imageUrl:
      "https://ftp.goit.study/img/readjourney/6546d503efab13a4ce5618a1_The_tigers.webp",
    totalPages: 304,
  },
  {
    _id: "mock-3",
    title: "Red",
    author: "Andriy Kokotiukha",
    imageUrl:
      "https://ftp.goit.study/img/readjourney/6546d503efab13a4ce5618a1_Red.webp",
    totalPages: 320,
  },
  {
    _id: "mock-4",
    title: "Voroshilovgrad",
    author: "Serhiy Zhadan",
    imageUrl:
      "https://ftp.goit.study/img/readjourney/6546d503efab13a4ce5618a1_Voroshilovgrad.jpg",
    totalPages: 552,
  },
  {
    _id: "mock-5",
    title: "Dream. Heavenly airlines",
    author: "Star Zhivka",
    imageUrl:
      "https://ftp.goit.study/img/readjourney/6546d503efab13a4ce5618a1_Dream._Heavenly_airlines.webp",
    totalPages: 32,
  },
  {
    _id: "mock-6",
    title: "Mesopotamia",
    author: "Serhiy Zhadan",
    imageUrl:
      "https://ftp.goit.study/img/readjourney/6546d503efab13a4ce5618a1_Mesopotamia.jpg",
    totalPages: 3456,
  },
  {
    _id: "mock-7",
    title: "It doesn`t hurt",
    author: "Kateryna Babkina",
    imageUrl:
      "https://ftp.goit.study/img/readjourney/6546d503efab13a4ce5618a1_It_doesn%27t_hurt.webp",
    totalPages: 72,
  },
  {
    _id: "mock-8",
    title: "Shadows of forgotten ancestors",
    author: "Mykhailo Kotsiubynskyi",
    imageUrl:
      "https://ftp.goit.study/img/readjourney/6546d503efab13a4ce5618a1_Shadows_of_forgotten_ancestors.jpg",
    totalPages: 160,
  },
  {
    _id: "mock-9",
    title: "Notes of a Ukrainian hermit",
    author: "Lina Kostenko",
    imageUrl:
      "https://ftp.goit.study/img/readjourney/6546d503efab13a4ce5618a1_Notes_of_a_Ukrainian_hermit.webp",
    totalPages: 416,
  },
  {
    _id: "mock-10",
    title: "Boarding school",
    author: "Serhiy Zhadan",
    imageUrl:
      "https://ftp.goit.study/img/readjourney/6546d503efab13a4ce5618a1_Boarding_school.webp",
    totalPages: 336,
  },
  {
    _id: "mock-11",
    title:
      "Gates of Europe. History of Ukraine from the Scythian Wars to Independence",
    author: "Serhiy Plohyi",
    imageUrl:
      "https://ftp.goit.study/img/readjourney/6546d503efab13a4ce5618a1_Gates_of_Europe._History_of_Ukraine_from_the_Scythian_Wars_to_Independence.jpg",
    totalPages: 496,
  },
  {
    _id: "mock-12",
    title: "Galya Without a Head",
    author: "Luco Dashvar",
    imageUrl:
      "https://ftp.goit.study/img/readjourney/6546d503efab13a4ce5618a1_GALYA_WITHOUT_A_HEAD.webp",
    totalPages: 400,
  },
  {
    _id: "mock-13",
    title: "There is land beyond Perekop",
    author: "anastasia Levkova",
    imageUrl:
      "https://ftp.goit.study/img/readjourney/6546d503efab13a4ce5618a1_There_is_land_beyond_Perekop.webp",
    totalPages: 392,
  },
];

const HomePage = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleAddToLibrary = () => {
    setSelectedBook(null);
    showInfoNotification(
      "Please login or register to add books to your library"
    );
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleFiltersApply = () => {
    setCurrentPage(1);
  };

  // Пагінація (10 книг на сторінку)
  const booksPerPage = 10;
  const totalPages = Math.ceil(MOCK_BOOKS.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = MOCK_BOOKS.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={css.homePage}>
      {/* Dashboard з фільтрами */}
      <Dashboard
        type="recommended"
        onFiltersApply={handleFiltersApply}
        isPublic={true}
      />

      {/* Список книжок */}
      <div className={css.recommendedBooks}>
        <div className={css.header}>
          <h2 className={css.title}>Recommended</h2>
          <div className={css.pagination}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={css.paginationButton}
              aria-label="Previous page"
            >
              <Icon name="chevron-left" className={css.arrowIcon} />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className={css.paginationButton}
              aria-label="Next page"
            >
              <Icon name="chevron-right" className={css.arrowIcon} />
            </button>
          </div>
        </div>

        <div className={css.booksList}>
          {currentBooks.map((book) => (
            <div key={book._id} className={css.bookWrapper}>
              <BookCard book={book} onClick={() => handleBookClick(book)} />
            </div>
          ))}
        </div>

        {/* Підказка про необхідність реєстрації */}
        <div className={css.loginPrompt}>
          <p className={css.promptText}>
            📚 To add books to your library and track reading progress, please{" "}
            <button
              onClick={() => navigate("/login")}
              className={css.promptLink}
            >
              log in
            </button>{" "}
            or{" "}
            <button
              onClick={() => navigate("/register")}
              className={css.promptLink}
            >
              register
            </button>
          </p>
        </div>
      </div>

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={handleCloseModal}
          onSuccess={handleAddToLibrary}
          mode="public"
        />
      )}
    </div>
  );
};

export default HomePage;
