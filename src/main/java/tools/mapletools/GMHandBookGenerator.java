package tools.mapletools;
import java.io.FileOutputStream;
import java.io.IOException;

import provider.*;
import provider.wz.WZFiles;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class GMHandBookGenerator {
    public static void main(String args[]) throws IOException {
        DataProvider charSource = DataProviderFactory.getDataProvider(WZFiles.CHARACTER);
        DataProvider stringSource = DataProviderFactory.getDataProvider(WZFiles.STRING);
        final DataDirectoryEntry capRoot = charSource.getRoot();
        final DataDirectoryEntry stringRoot = stringSource.getRoot();
        List<Integer> capList = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        FileOutputStream out = new FileOutputStream("gmhandbook/Weapon.txt", true);
        System.out.println("Loading Weapon!");
        //sb.append("Cap:\r\n");
        for (DataDirectoryEntry mDir : capRoot.getSubdirectories()) {
            String dirName = mDir.getName();
            if (dirName.contentEquals("Weapon")) {
                for (DataFileEntry mFile : mDir.getFiles()) {
                    int id = Integer.parseInt(mFile.getName().substring(0, 8));
                    capList.add(id);
                }
            }
        }
        for (int item : capList) {
            for (Data a : stringSource.getData("Eqp.img").getChildren()) {
                for (Data b : a.getChildren()) {
                    if (b.getName().equals("Weapon")) {
                        for (Data c : b.getChildren()) {
                            if (c.getName().equals(Integer.toString(item))) {
                                System.out.println(Integer.toString(item) + " : " + c.getChildren().get(0).getData() + "\r\n");
                                sb.append(Integer.toString(item) + " : " + c.getChildren().get(0).getData() + "\r\n");
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }
        sb.append("\r\n\r\n");
        out.write(sb.toString().getBytes());
    }
}
