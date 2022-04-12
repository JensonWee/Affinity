package tools.mapletools;
import java.io.FileOutputStream;
import java.io.IOException;
import provider.DataDirectoryEntry;
import provider.DataFileEntry;
import provider.DataProvider;
import provider.wz.WZFiles;
import provider.DataProviderFactory;

public class HairStylist {

        public static void main(String args[]) throws IOException {
            DataProvider hairSource = DataProviderFactory.getDataProvider(WZFiles.CHARACTER);
            final DataDirectoryEntry root = hairSource.getRoot();
            StringBuilder sb = new StringBuilder();
            FileOutputStream out = new FileOutputStream("hairAndFacesID.txt", true);
            System.out.println("Loading Male Hairs!");
            sb.append("hairMale:\r\n");
            for (DataDirectoryEntry mDir : root.getSubdirectories()) {
                String dirName = mDir.getName();
                if (dirName.contentEquals("Hair")) {
                    for (DataFileEntry mFile : mDir.getFiles()) {
                        int id = Integer.parseInt(mFile.getName().substring(0, 8));
                        if ((id / 1000 == 30 || id / 1000 == 33) && id % 10 == 0) {
                            sb.append(id).append(", ");
                        }
                    }
                }
            }
            System.out.println("Loading Female Hairs!");
            sb.append("\r\n\r\n");
            sb.append("hairFemale:\r\n");
            for (DataDirectoryEntry mDir : root.getSubdirectories()) {
                String dirName = mDir.getName();
                if (dirName.contentEquals("Hair")) {
                    for (DataFileEntry mFile : mDir.getFiles()) {
                        int id = Integer.parseInt(mFile.getName().substring(0, 8));
                        if ((id / 1000 == 31 || id / 1000 == 34) && id % 10 == 0) {
                            sb.append(id).append(", ");
                        }
                    }
                }
            }
            System.out.println("Loading Male Faces!");
            sb.append("\r\n\r\n");
            sb.append("faceMale:\r\n");
            for (DataDirectoryEntry mDir : root.getSubdirectories()) {
                String dirName = mDir.getName();
                if (dirName.contentEquals("Face")) {
                    for (DataFileEntry mFile : mDir.getFiles()) {
                        int id = Integer.parseInt(mFile.getName().substring(0, 8));
                        if ((id / 1000 == 20) && id % 1000 < 100) {
                            sb.append(id).append(", ");
                        }
                    }
                }
            }
            System.out.println("Loading Female Face!");
            sb.append("\r\n\r\n");
            sb.append("faceFemale:\r\n");
            for (DataDirectoryEntry mDir : root.getSubdirectories()) {
                String dirName = mDir.getName();
                if (dirName.contentEquals("Face")) {
                    for (DataFileEntry mFile : mDir.getFiles()) {
                        int id = Integer.parseInt(mFile.getName().substring(0, 8));
                        if ((id / 1000 == 21) && id % 1000 < 100) {
                            sb.append(id).append(", ");
                        }
                    }
                }
            }
            sb.append("\r\n\r\n");
            out.write(sb.toString().getBytes());
        }
    }


