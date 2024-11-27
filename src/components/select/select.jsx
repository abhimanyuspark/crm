import { useEffect, useRef, useState, useMemo } from "react";
import styles from "./select.module.css";

const Select = ({
  loading = false,
  className = "",
  multiple = false,
  value = multiple ? [] : "",
  onChange = (c) => c,
  options = [],
  width = "100%",
  optionswidth = "100%",
  search = false,
  emptylist = false,
  clearicon = false,
  fields = (i) => i,
  optiontemplete = (o) => o,
  valuetemplete = (v) => v,
  multiplvaluetemplete = (m) => m,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const parentRef = useRef(null);
  const inputRef = useRef(null);

  const labelInfo = (option) => (option === "" ? "--" : fields(option));

  function selectOption(option) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function isOptionSelected(option) {
    return multiple
      ? value.includes(option)
      : labelInfo(option) === labelInfo(value);
  }

  const filterOptions = useMemo(() => {
    return options?.filter((o) =>
      labelInfo(o)?.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  // Focus on input field and clear the search box when dropdown opens
  useEffect(() => {
    if (isOpen) {
      inputRef?.current?.focus();
    } else {
      setQuery("");
    }
  }, [isOpen, inputRef]);

  //  Close the dropdown when clicking outside of it or its
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (parentRef.current && !parentRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, parentRef, setIsOpen]);

  return (
    <div ref={parentRef} style={{ width: width }} className={`${styles.main}`}>
      {/*  Select Input Field */}

      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className={`${styles.container} ${className}`}
      >
        {/* Display Options */}
        <span className={styles.value}>
          {multiple ? (
            //  For multiple select show a list of selected items
            value.length > 0 ? (
              value.map((v, i) => (
                <span
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    selectOption(v);
                  }}
                  className={styles["option-badge"]}
                >
                  {multiplvaluetemplete()
                    ? multiplvaluetemplete(labelInfo(v))
                    : labelInfo(v)}
                  <span className={styles["remove-btn"]}>&times;</span>
                </span>
              ))
            ) : (
              <span>--</span>
            )
          ) : //  Single select just display the current selected item
          valuetemplete() ? (
            valuetemplete(value)
          ) : value === "" ? (
            <span>--</span>
          ) : (
            labelInfo(value)
          )}
        </span>
        {/* Clear Icon */}
        {clearicon && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              clearOptions();
            }}
            className={styles["clear-btn"]}
          >
            &times;
          </div>
        )}
        {/* Divider */}
        {clearicon && <div className={styles.divider}></div>}
        {/* Caret Icon */}
        <div className={styles.caret}></div>
      </div>

      {/*  Options List */}

      <ul
        style={{ width: optionswidth }}
        className={`${styles.options} ${isOpen ? styles.show : ""}`}
      >
        {/*  Custom Filtering Option */}

        {search && (
          <li className={`${styles["search-box"]}`}>
            <input
              ref={inputRef}
              type="text"
              value={query}
              placeholder="Search here..."
              onChange={(e) => {
                const value = e.target.value;
                setQuery(value);
              }}
              className={`${styles.search}`}
            />
          </li>
        )}

        {/* Custom Select All and Deselect All Option */}

        {multiple && (
          <li className={`${styles["buttons-box"]}`}>
            <div
              className={`${styles.button}`}
              onClick={() => {
                setIsOpen(false);
                onChange([...filterOptions]);
              }}
            >
              Select All
            </div>
            <div
              className={`${styles.button}`}
              onClick={() => {
                onChange([]);
              }}
            >
              Deselect All
            </div>
          </li>
        )}

        {/* Options List */}

        <ul className={styles.list}>
          {/* Empty Option */}

          {!multiple && emptylist && (
            <li
              onClick={() => {
                selectOption("");
                setIsOpen(false);
              }}
              className={`${styles.option} ${
                value === "" ? styles.selected : ""
              }`}
            >
              --
            </li>
          )}

          {/* Options */}

          {loading ? (
            <li className={`${styles.option} ${styles["no-data"]}`}>
              Loading...
            </li>
          ) : filterOptions.length > 0 ? (
            filterOptions.map((option, index) => (
              <li
                onClick={() => {
                  selectOption(option);
                  !multiple && setIsOpen(false);
                }}
                key={index}
                className={`${styles.option} ${
                  isOptionSelected(option) ? styles.selected : ""
                }`}
              >
                {optiontemplete() ? optiontemplete(option) : labelInfo(option)}
              </li>
            ))
          ) : (
            <li className={`${styles.option} ${styles["no-data"]}`}>
              -- No data found --
            </li>
          )}
        </ul>
      </ul>
    </div>
  );
};

export default Select;
