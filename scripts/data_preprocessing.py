import logging
import os
import pandas as pd
from IPython.display import display


class DataPreprocessor:
    def __init__(
        self,
        file_path: str,
        output_dir: str = "../data/",
        output_file: str = "data.csv",
        log_file="../logs/data_preprocessing.log",
        log_level=logging.INFO,
    ):
        """
        Initialize the DataPreprocessor class with the local file path to the dataset.

        Parameters:
        file_path (str): The local file path to the data file.
        output_dir (str): The directory where the data file will be saved.
        output_file (str): The local file name to save the downloaded data.
        log_file (str): The file where logs will be saved.
        log_level (logging level): The level of logging (default is logging.INFO).
        """
        self.file_path = file_path
        self.output_dir = output_dir
        self.output_file = os.path.join(self.output_dir, output_file)
        self.data: pd.DataFrame = None
        self.logger = self.setup_logging(log_file, log_level)

    def setup_logging(self, log_file, log_level):
        """
        Sets up logging for the application.

        Parameters:
        log_file (str): The name of the file to save logs.
        log_level (logging level): The logging level.

        Returns:
        logging.Logger: The configured logger instance.
        """
        # Ensure the directory exists
        log_dir = os.path.dirname(log_file)
        if not os.path.exists(log_dir):
            os.makedirs(log_dir)

        logger = logging.getLogger(__name__)
        logger.setLevel(log_level)

        # Create a file handler for logging
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(log_level)

        # Define the logging format
        formatter = logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        )
        file_handler.setFormatter(formatter)

        # Add the handler to the logger
        logger.addHandler(file_handler)

        return logger

    def load_data(self) -> pd.DataFrame:
        """
        Load the dataset from the local file path and save it in the specified directory.

        Returns:
        pd.DataFrame: The loaded dataset.
        """
        try:
            os.makedirs(self.output_dir, exist_ok=True)
            self.logger.info(f"Directory checked/created: {self.output_dir}")

            self.logger.info("Loading data from the local file path.")

            self.data = pd.read_csv(self.file_path)

            # Convert Date to Datetime format
            self.data["Date"] = pd.to_datetime(
                self.data["Date"].str.strip(), errors="coerce"
            )

            self.logger.info("Data loaded into DataFrame successfully.")
            return self.data

        except Exception as e:
            self.logger.error(f"Error loading data: {e}")
            raise
