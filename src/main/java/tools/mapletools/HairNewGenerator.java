package tools.mapletools;
import java.io.FileOutputStream;
import java.io.IOException;
import provider.DataDirectoryEntry;
import provider.DataFileEntry;
import provider.DataProvider;
import provider.wz.WZFiles;
import provider.DataProviderFactory;
public class HairNewGenerator {
    public static void main(String args[]) throws IOException {
        DataProvider hairSource = DataProviderFactory.getDataProvider(WZFiles.CHARACTER);
        final DataDirectoryEntry root = hairSource.getRoot();
        StringBuilder sb = new StringBuilder();
        FileOutputStream out = new FileOutputStream("hairAndFacesID.txt", true);
        System.out.println("Loading Male Hairs!");
        sb.append("combineHair:\r\n");
        int counter = 0;
        int counter1 = 0;
        for (DataDirectoryEntry mDir : root.getSubdirectories()) {
            String dirName = mDir.getName();
            if (dirName.contentEquals("Hair")) {
                for (DataFileEntry mFile : mDir.getFiles()) {
                    int id = Integer.parseInt(mFile.getName().substring(0, 8));
                    if ((id >= 30000) && (id <= 40000) && id % 10 == 0) {
                        System.out.println(id);
                        sb.append(id).append(", ");
                        counter++;
                        if (counter >  99) {
                            counter = 0;
                            counter1++;
                            sb.append("\r\n\r\n");
                            sb.append("combineHair"+ counter1 +":\r\n");

                        }
                    }
                }
            }
        }
        sb.append("\r\n\r\n");
        out.write(sb.toString().getBytes());
        System.out.println(counter);
    }
}
