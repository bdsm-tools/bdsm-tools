resource "google_storage_bucket" "bdsmtools-ui" {
  name          = "www.bdsmtools.org"
  location      = "europe-west2"
  force_destroy = true

  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }
  cors {
    origin          = ["http://www.bdsmtools.org"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_storage_bucket_iam_binding" "public_access" {
  bucket = google_storage_bucket.bdsmtools-ui.name
  role   = "roles/storage.objectViewer"

  members = [
    "allUsers",
  ]
}

resource "google_storage_bucket" "bdsmtools-test-ui" {
  name          = "test.bdsmtools.org"
  location      = "europe-west2"
  force_destroy = true

  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }
  cors {
    origin          = ["http://test.bdsmtools.org"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_storage_bucket_iam_binding" "public_access-test" {
  bucket = google_storage_bucket.bdsmtools-test-ui.name
  role   = "roles/storage.objectViewer"

  members = [
    "allUsers",
  ]
}